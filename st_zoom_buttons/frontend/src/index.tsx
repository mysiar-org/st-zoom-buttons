import { RenderData, Streamlit } from "streamlit-component-lib"

const BUTTON_ATTR_RETURNS: string = "element-returns"

const borderColor: string = "#D3D3D3"


const span = document.body.appendChild(document.createElement("span"))

const title_el = span.appendChild(document.createElement("span"))


const zoom_out = span.appendChild(document.createElement("button"))
zoom_out.textContent = "-"
zoom_out.setAttribute("title", "Zoom Out")
zoom_out.setAttribute(BUTTON_ATTR_RETURNS, "zoom_out")

const zoom_reset = span.appendChild(document.createElement("button"))
zoom_reset.textContent = "R"
zoom_reset.setAttribute("title", "Zoom Reset")
zoom_reset.setAttribute(BUTTON_ATTR_RETURNS, "zoom_reset")

const zoom_in = span.appendChild(document.createElement("button"))
zoom_in.textContent = "+"
zoom_in.setAttribute("title", "Zoom In")
zoom_in.setAttribute(BUTTON_ATTR_RETURNS, "zoom_in")


const zoomButtons = [
    { element: zoom_out, name: "zoom_out" },
    { element: zoom_reset, name: "zoom_reset" },
    { element: zoom_in, name: "zoom_in" },
]

function darkenColor(hex: string, percent: number): string {
    hex = hex.replace(/^#/, "");
    const num = parseInt(hex, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.max(0, Math.floor(r * (1 - percent / 100)));
    g = Math.max(0, Math.floor(g * (1 - percent / 100)));
    b = Math.max(0, Math.floor(b * (1 - percent / 100)));

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}


function onRender(event: Event): void {

    const data = (event as CustomEvent<RenderData>).detail
    const { args } = data;
    const {
        font_size,
        width,
        border_radius,
        key,
        title,
        disabled = []
    } = args


    const buttonStyle: CSSStyleDeclaration = {
        marginRight: "5px",
        border: "1px solid",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontWeight: "bold",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: `${border_radius}px`,
        outline: "none !important"
    } as CSSStyleDeclaration


    if (title) {
        title_el.textContent = title
        title_el.style.fontSize = font_size
        title_el.style.marginRight = "10px"
    }

    if (data.theme) {
        const theme = data.theme

        for (const { element: button, name } of zoomButtons) {
            Object.assign(button.style, buttonStyle)

            button.disabled = disabled.includes(name);

            button.id = `${key}-${name}`
            button.style.color = theme.textColor
            button.style.backgroundColor = theme.backgroundColor
            button.style.borderColor = borderColor
            button.style.fontSize = font_size
            button.style.width = width

            if (button.disabled) {
                button.style.color = darkenColor(theme.textColor, 50)
                button.style.borderColor = darkenColor(borderColor, 50)
            }


            button.onmouseover = function (): void {
                if (button.disabled) return;
                button.style.color = theme.primaryColor
                button.style.borderColor = theme.primaryColor
            }

            button.onmouseout = function (): void {
                if (button.disabled) return;
                button.style.color = theme.textColor
                button.style.backgroundColor = theme.backgroundColor
                button.style.borderColor = borderColor
            }

            button.onclick = function (): void {
                Streamlit.setComponentValue(button.getAttribute(BUTTON_ATTR_RETURNS))
            }

            button.onmousedown = function (): void {
                if (button.disabled) return;
                button.style.color = "white"
                button.style.backgroundColor = theme.primaryColor
            }

            button.onmouseup = function (): void {
                if (button.disabled) return;
                button.style.color = theme.textColor
                button.style.backgroundColor = theme.backgroundColor
                button.style.borderColor = borderColor
            }
        }
    }
    Streamlit.setFrameHeight()
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
Streamlit.setFrameHeight()
