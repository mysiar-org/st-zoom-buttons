# Streamlit zoom-buttons component

---

Streamlit zoom buttons component


## Installation instructions

```sh
pip install st-zoom-buttons
```

## Usage instructions

```python
import streamlit as st

from st_zoom_buttons import st_zoom_buttons

clicked_button = st_zoom_buttons()

st.write(f"Clicked: {clicked_button}")
```

Function interface

```python
def st_zoom_buttons(
    key=None,
    font_size="10px",
    width="35px",
    border_radius: int = 0,
    title: str = "",
    disabled: list[str] | None = None,
    on_zoom_in: Optional[Callable[[], None]] = None,
    on_zoom_out: Optional[Callable[[], None]] = None,
    on_zoom_reset: Optional[Callable[[], None]] = None,
) -> str:
```


