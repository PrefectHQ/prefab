"""Distribution-level checks for installed coding guides."""

import subprocess
import sys
from pathlib import Path
from zipfile import ZipFile

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]


def build(*args: str) -> None:
    result = subprocess.run(
        ["uv", "build", *args],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0, result.stdout + result.stderr


@pytest.mark.timeout(120)
def test_guides_work_in_direct_and_sdist_built_wheels(tmp_path: Path) -> None:
    direct = tmp_path / "direct"
    rebuilt = tmp_path / "rebuilt"
    build("--sdist", "--wheel", "--out-dir", str(direct))
    build("--wheel", str(next(direct.glob("*.tar.gz"))), "--out-dir", str(rebuilt))
    outside = tmp_path / "outside-checkout"
    outside.mkdir()

    for index, wheel in enumerate([*direct.glob("*.whl"), *rebuilt.glob("*.whl")]):
        installed = tmp_path / f"installed-{index}"
        with ZipFile(wheel) as archive:
            assert "prefab_ui/skills/prefab-ui/SKILL.md" in archive.namelist()
            archive.extractall(installed)
        result = subprocess.run(
            [
                sys.executable,
                "-I",
                "-c",
                "import sys; from pathlib import Path; "
                "sys.path.insert(0, sys.argv[1]); "
                "from prefab_ui import generative; "
                "assert Path(generative.__file__).is_relative_to(Path(sys.argv[1])); "
                "assert 'prefab-ui' in generative.list_guides(); "
                "guide = generative.get_guide('prefab-ui'); "
                "assert 'PrefabApp' in guide; "
                "assert 'chart' in guide.lower(); "
                "assert 'form' in guide.lower()",
                str(installed),
            ],
            cwd=outside,
            capture_output=True,
            text=True,
        )
        assert result.returncode == 0, result.stdout + result.stderr
