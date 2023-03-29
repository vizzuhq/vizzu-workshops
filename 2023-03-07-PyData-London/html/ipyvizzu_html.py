import pandas as pd
from ipyvizzu import Chart, Data, Config, Style, DisplayTarget
 
data_frame = pd.read_csv(
    "https://ipyvizzu.vizzuhq.com/0.15/assets/data/chart_types_eu.csv",
    dtype={"Year": str, "Timeseries": str},
)
data = Data()
data.add_data_frame(data_frame)
 
chart = Chart(display=DisplayTarget.MANUAL)
chart.animate(data)

chart.animate(
    Config.column(
        {
            "x": "Joy factors",
            "y": "Value 2 (+)",
            "title": "Column Chart",
        }
    )
)

html = chart._repr_html_()
print(html)