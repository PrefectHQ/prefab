"""Embed external content via iframe."""

from __future__ import annotations

from html.parser import HTMLParser
from typing import Any, Literal

from pydantic import Field, model_validator

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Embed(Component):
    """Embed external content in a sandboxed iframe.

    Accepts either a ``url`` (iframe src) or ``html`` (iframe srcdoc),
    but not both.  Use ``url`` for YouTube, Google Maps, and other
    hosted content.  Use ``html`` for custom HTML/JS like Three.js
    scenes or Canvas-based visualizations.

    Example::

        Embed(url="https://www.youtube.com/embed/dQw4w9WgXcQ")
        Embed(html="<canvas id='c'></canvas><script>/*...*/</script>")
    """

    type: Literal["Embed"] = "Embed"
    url: RxStr | None = Field(default=None, description="URL to embed (iframe src)")
    html: str | None = Field(default=None, description="HTML to embed (iframe srcdoc)")
    width: str | None = Field(default=None, description="CSS width")
    height: str | None = Field(default=None, description="CSS height")
    sandbox: str | None = Field(
        default=None,
        description="Iframe sandbox attribute (e.g. 'allow-scripts allow-same-origin')",
    )
    allow: str | None = Field(
        default=None,
        description="Iframe allow attribute (e.g. 'fullscreen; autoplay')",
    )

    def __init__(self, url: str | None = None, /, **kwargs: Any) -> None:
        if url is not None and "url" not in kwargs:
            kwargs["url"] = url
        super().__init__(**kwargs)

    @model_validator(mode="after")
    def _exactly_one_source(self) -> Embed:
        if self.url is not None and self.html is not None:
            raise ValueError("Embed requires either 'url' or 'html', not both")
        if self.url is None and self.html is None:
            raise ValueError("Embed requires either 'url' or 'html'")
        return self

    @classmethod
    def from_iframe(cls, iframe_html: str, **kwargs: Any) -> Embed:
        """Create an Embed from a raw ``<iframe>`` HTML snippet.

        Parses the tag attributes and maps them to Embed fields::

            Embed.from_iframe(
                '<iframe src="https://example.com" width="600" height="400"'
                ' allow="fullscreen"></iframe>'
            )

        Any ``**kwargs`` override the parsed attributes.
        """
        parsed_attrs: dict[str, str | None] = {}

        class _Parser(HTMLParser):
            def handle_starttag(
                self, tag: str, attrs: list[tuple[str, str | None]]
            ) -> None:
                if tag == "iframe":
                    parsed_attrs.update(attrs)

        _Parser().feed(iframe_html)

        if not parsed_attrs:
            raise ValueError("No <iframe> tag found in the provided HTML")

        embed_kwargs: dict[str, Any] = {}
        for iframe_attr, embed_field in (
            ("src", "url"),
            ("width", "width"),
            ("height", "height"),
            ("allow", "allow"),
            ("sandbox", "sandbox"),
        ):
            value = parsed_attrs.get(iframe_attr)
            if value is not None:
                # Bare numeric dimensions → CSS px
                if embed_field in ("width", "height") and value.isdigit():
                    value = f"{value}px"
                embed_kwargs[embed_field] = value

        embed_kwargs.update(kwargs)
        return cls(**embed_kwargs)
