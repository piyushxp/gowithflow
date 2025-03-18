const data = {
    "slides": [
      {
        "file": "ONE.png",
        "id": "i671144",
        "slide_name": "ONE",
        "widgets": [
            {
                "rect": "505,106,605,136",
                "type": "typeahead",
                "values": [
                  { "destination": "i671142", "mode": "default", "text": "ONE" },
                  { "coaching": "930385", "mode": "default", "text": "TWO" },
                  { "coaching": "930386", "mode": "default", "text": "THREE" },
                  { "coaching": "930387", "text": "*" }
                ],
                "widget_unique_key": "L3keFbdITSpp",
                "help": "Select a slide to navigate",
                "pulse": { "text": "Choose Option", "toggle": false },
                "placeholder": "Search..."
              },
          {
            "destination": "i671147",
            "rect": "14,104,130,154",
            "type": "hotspot",
            "widget_unique_key": "Lf7CqD2kuNF8",
            "help": "Click to navigate to slide TWO",
            "pulse": { "text": "Navigate", "toggle": false },
            "placeholder": "Click here"
          },
          {
            "rect": "700,106,605,136",
            "styles": {
              "background-color": "#000000",
              "color": "#e90c0c",
              "font-family": "Arial",
              "font-size": "17px"
            },
            "text": "SLIDE ONE",
            "type": "text",
            "widget_unique_key": "R2XvFR4kllaB",
            "help": "Displays the slide title",
            "pulse": { "text": "Important Info", "toggle": false },
            "placeholder": "Enter text here"
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
            "rect": "505,106,605,136",
            "type": "typeahead",
            "values": [
              { "destination": "i671142", "mode": "default", "text": "ONE" },
              { "coaching": "930385", "mode": "default", "text": "TWO" },
              { "coaching": "930386", "mode": "default", "text": "THREE" },
              { "coaching": "930387", "text": "*" }
            ],
            "widget_unique_key": "L3keFbdITSpp",
            "help": "Select a slide to navigate",
            "pulse": { "text": "Choose Option", "toggle": false },
            "placeholder": "Search..."
          }
        ]
      },
      {
        "file": "FIVE.png",
        "id": "i671142",
        "slide_name": "FIVE",
        "widgets": [
          {
            "rect": "156,417,307,434",
            "type": "datepicker",
            "values": [
              { "destination": "i671141", "mode": "default", "text": "2023-01-01" },
              { "coaching": "930388", "text": "*" }
            ],
            "widget_unique_key": "L3keFbdITSpp",
            "help": "Select a date",
            "pulse": { "text": "Choose Date", "toggle": false },
            "placeholder": "Select a date"
          }
        ]
      },
      {
        "file": "SIX.png",
        "id": "i671141",
        "slide_name": "SIX",
        "simcomplete": "true",
        "widgets": [
          {
            "rect": "156,417,307,434",
            "type": "image",
            "src": "ONE.png",
            "alt": "Sample image",
            "widget_unique_key": "L3keFbdITSpp",
            "help": "Click to toggle visibility",
            "pulse": { "text": "Click Me", "toggle": false },
            "placeholder": "Image"
          }
        ]
      }
    ]
  };
  
export default data;