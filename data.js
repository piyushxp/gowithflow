const data = {
    "slides": [
      {
        "file": "ONE.png",
        "id": "i671144",
        "slide_name": "ONE",
        "widgets": [
          {
            "destination": "i671147",
            "rect": "14,104,130,154",
            "type": "hotspot",
            "widget_unique_key": "Lf7CqD2kuNF8",
            "help": "Click to navigate to slide TWO",
            "pulse": { "text": "Navigate", "toggle": false },
            "placeholder": "Click here"
          }
        ]
      },
      {
        "file": "TWO.png",
        "id": "i671147",
        "slide_name": "TWO",
        "widgets": [
          {
            "rect": "420,123,619,141",
            "type": "textbox",
            "values": [
              { "destination": "i671146", "mode": "default", "text": "current payload" },
              { "coaching": "930384", "text": "*" }
            ],
            "widget_unique_key": "28TKA6Sao557",
            "help": "Enter your data here",
            "pulse": { "text": "Input Required", "toggle": false },
            "placeholder": "Type something..."
          }
        ]
      },
      {
        "file": "THREE.png",
        "id": "i671146",
        "slide_name": "THREE",
        "widgets": [
          {
            "destination": "i671143",
            "rect": "145,426,301,564",
            "type": "hotspot",
            "widget_unique_key": "esUbaXw5PQmg",
            "help": "Click to go to slide FOUR",
            "pulse": { "text": "Next Slide", "toggle": false },
            "placeholder": "Click here"
          }
        ]
      },
      {
        "file": "FOUR.png",
        "id": "i671143",
        "slide_name": "FOUR",
        "widgets": [
          {
            "rect": "156,417,307,434",
            "type": "menu",
            "values": [
              { "text": "---NONE---" },
              { "destination": "i671142", "mode": "default", "text": "ONE" },
              { "coaching": "930385", "mode": "default", "text": "TWO" },
              { "coaching": "930386", "mode": "default", "text": "THREE" },
              { "coaching": "930387", "text": "*" }
            ],
            "widget_unique_key": "L3keFbdITSpp",
            "help": "Select a slide to navigate",
            "pulse": { "text": "Choose Option", "toggle": false },
            "placeholder": "Select an option"
          },
          
          {
            "rect": "626,118,751,145",
            "type": "image",
            "values":[],
            "toggle":false,
            "widget_unique_key": "L3keFbdITSpp",
            "help": "Select a slide to navigate",
            "pulse": { "text": "Choose Option", "toggle": false },
            "placeholder": "Select an option"
          }
        ]
      },
      {
        "file": "FIVE.png",
        "id": "i671142",
        "slide_name": "FIVE",
        "widgets": [
          {
            "rect": "626,118,751,145",
            "type": "datepicker",
            "values": [
              { "destination": "i671145", "text": "2025-02-28" },
              { "coaching": "930388", "text": "*" }
            ],
            "widget_unique_key": "aftjGiIUgCDU",
            "help": "Pick a date",
            "pulse": { "text": "Select Date", "toggle": false },
            "placeholder": "YYYY-MM-DD"
          },
          {
            "destination": "i671144",
            "rect": "392,161,479,184",
            "text": "REFRESH",
            "type": "button",
            "widget_unique_key": "uDKo7QWF0cqN",
            "help": "Click to refresh the slide",
            "pulse": { "text": "Refresh", "toggle": false },
            "placeholder": "Click to refresh"
          }
        ]
      },
      {
        "file": "SIX.png",
        "id": "i671145",
        "simcomplete": "true",
        "slide_name": "SIX",
        "widgets": []
      }
    ],
    "version": "2.0"
}
  