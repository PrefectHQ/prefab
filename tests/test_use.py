"""Serialization of naming props on reusable component instances."""

from prefab_ui.rx import Rx
from prefab_ui.use import Use


def test_use_serializes_reactive_accessible_names_outside_let():
    assert Use(
        "record-button",
        record_id=1042,
        aria_label=Rx("record_name"),
        aria_labelledby="record-label",
    ).to_json() == {
        "$ref": "record-button",
        "let": {"record_id": 1042},
        "ariaLabel": "{{ record_name }}",
        "ariaLabelledBy": "record-label",
    }


def test_use_accepts_naming_aliases_and_omits_unset_names():
    assert Use("button", ariaLabel="Open", ariaLabelledBy="label").to_json() == {
        "$ref": "button",
        "ariaLabel": "Open",
        "ariaLabelledBy": "label",
    }
    assert Use("button").to_json() == {"$ref": "button"}


def test_reusable_instances_keep_distinct_names_and_template_defaults():
    from prefab_ui import PrefabApp
    from prefab_ui.components import Button, Column
    from prefab_ui.define import Define

    with Define("record-button") as template:
        Button("Open", aria_label="Template default")
    with Column() as view:
        Use("record-button", aria_label="Open first")
        Use("record-button", aria_label=Rx("record_name"))
        Use("record-button")
    wire = PrefabApp(view=view, defs=[template]).to_json()
    assert wire["defs"]["record-button"]["ariaLabel"] == "Template default"
    assert [
        child.get("ariaLabel") for child in wire["view"]["children"][0]["children"]
    ] == [
        "Open first",
        "{{ record_name }}",
        None,
    ]
