const WIDGET_TYPES = {
    HOTSPOT: 'hotspot',
    TEXT: 'text',
    BUTTON: 'button',
    TEXTBOX: 'textbox',
    MENU: 'menu',
    DATEPICKER: 'datepicker',
    TYPEAHEAD: 'typeahead',
    IMAGE: 'image'
};

function initialize(){
    // Get the slide container element
    const slideContainer = document.getElementById('slideContainer');
    
    // Create and append all slides to the container
    createSlides(slideContainer);
    
    // Show the first slide
    showSlideById(data.slides[0].id);
}

function createSlides(container) {
    
    data.slides.forEach(slide => {
       
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.id = slide.id;
        

        const slideImg = document.createElement('img');
        slideImg.src = slide.file;
        slideImg.alt = slide.slide_name;
        slideDiv.appendChild(slideImg);
        
    
        createWidgets(slideDiv, slide.widgets);
        

        container.appendChild(slideDiv);
    });
}

function createWidgets(slideDiv, widgets) {

    widgets.forEach(widget => {
        if (widget.type === WIDGET_TYPES.TEXT) {
            // For text widgets, create and position the widget directly without overlay
            const widgetElement = createWidgetElement(widget);
            widgetElement.style.position = 'absolute';
            const [left, top, right, bottom] = widget.rect.split(',').map(Number);
            widgetElement.style.left = `${left}px`;
            widgetElement.style.top = `${top}px`;
            widgetElement.style.width = `${right - left}px`;
            widgetElement.style.height = `${bottom - top}px`;
            slideDiv.appendChild(widgetElement);
        } else {
            // For other widgets, create overlay with orange border
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            
            // Set the position and size of the overlay based on the rect coordinates
            const [left, top, right, bottom] = widget.rect.split(',').map(Number);
            overlay.style.left = `${left}px`;
            overlay.style.top = `${top}px`;
            overlay.style.width = `${right - left}px`;
            overlay.style.height = `${bottom - top}px`;
            
            // Create the appropriate widget element based on its type
            const widgetElement = createWidgetElement(widget);
            
            // Append the widget element to the overlay
            overlay.appendChild(widgetElement);
            
            // Append the overlay to the slide
            slideDiv.appendChild(overlay);
        }
    });
}

function createWidgetElement(widget) {
    let element;
    
    switch(widget.type) {
        case WIDGET_TYPES.HOTSPOT:
            element = createHotspotWidget(widget);
            break;
            
        case WIDGET_TYPES.TEXT:
            element = createTextWidget(widget);
            break;
            
        case WIDGET_TYPES.BUTTON:
            element = createButtonWidget(widget);
            break;
            
        case WIDGET_TYPES.TEXTBOX:
            element = createTextboxWidget(widget);
            break;
            
        case WIDGET_TYPES.MENU:
            element = createMenuWidget(widget);
            break;
            
        case WIDGET_TYPES.DATEPICKER:
            element = createDatepickerWidget(widget);
            break;

        case WIDGET_TYPES.TYPEAHEAD:
            element = createTypeaheadWidget(widget);
            break;
            
        case WIDGET_TYPES.IMAGE:
            element = createImageWidget(widget);
            break;
            
        default:
            element = createDefaultWidget(widget);
    }
    
    if (widget.pulse && widget.pulse.text) {
        addPulseIconAndTooltip(element, widget.pulse);
    }

    //to add other thing related to ui here
    
    return element;
}

function createHotspotWidget(widget) {
    const element = document.createElement('div');
    element.className = 'widget hotspot';
    element.title = widget.help || widget.placeholder || '';
    
    if (widget.destination) {
        element.addEventListener('click', () => showSlideById(widget.destination));
    }
    
    return element;
}

function createTextWidget(widget) {
    const element = document.createElement('div');
    element.className = 'widget text';
    element.textContent = widget.text || '';
    element.title = widget.help || widget.placeholder || '';
    
    if (widget.styles) {
        Object.assign(element.style, widget.styles);
    }
    
    return element;
}

function createButtonWidget(widget) {
    const element = document.createElement('button');
    element.className = 'widget button';
    element.textContent = widget.text || '';
    element.title = widget.help || widget.placeholder || '';
    
    if (widget.destination) {
        element.addEventListener('click', () => showSlideById(widget.destination));
    }
    
    return element;
}

function createTextboxWidget(widget) {
    const element = document.createElement('input');
    element.type = 'text';
    element.className = 'widget textbox';
    element.placeholder = widget.placeholder || '';
    element.title = widget.help || '';
    
    if (widget.values && widget.values.length > 0) {
        element.value = '';
        addTextboxEventListener(element, widget);
    }
    
    return element;
}

function addTextboxEventListener(element, widget) {
    element.addEventListener('change', (e) => {
        const inputValue = e.target.value;
        const matchedValue = widget.values.find(value => value.text === inputValue && value.text !== '*');
        
        if (matchedValue && matchedValue.destination) {
            showSlideById(matchedValue.destination);
            e.target.value = '';
        } else {
            handleInvalidInput(widget, 'Invalid input');
        }
    });
}

function createMenuWidget(widget) {
    const element = document.createElement('select');
    element.className = 'widget menu';
    element.title = widget.help || widget.placeholder || '';
    
    if (widget.values) {
        addMenuOptions(element, widget.values);
        addMenuEventListener(element, widget);
    }
    
    return element;
}

function addMenuOptions(element, values) {
    values.forEach(value => {
        if (value.text !== '*') {
            const option = document.createElement('option');
            option.textContent = value.text || '';
            option.value = value.text || '';
            if (value.destination) {
                option.dataset.destination = value.destination;
            }
            element.appendChild(option);
        }
    });
}

function addMenuEventListener(element, widget) {
    element.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const matchedValue = widget.values.find(value => value.text === selectedValue && value.text !== '*');
        
        if (matchedValue && matchedValue.destination) {
            showSlideById(matchedValue.destination);
            e.target.value = '';
        } else {
            handleInvalidInput(widget, 'Invalid selection');
        }
    });
}

function createDatepickerWidget(widget) {
    const element = document.createElement('input');
    element.type = 'date';
    element.className = 'widget datepicker';
    element.placeholder = widget.placeholder || '';
    element.title = widget.help || '';
    
    if (widget.values && widget.values.length > 0) {
        element.value = '';
        addDatepickerEventListener(element, widget);
    }
    
    return element;
}

function addDatepickerEventListener(element, widget) {
    element.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        const matchedValue = widget.values.find(value => value.text === selectedDate && value.text !== '*');
        
        if (matchedValue && matchedValue.destination) {
            showSlideById(matchedValue.destination);
            e.target.value = '';
        } else {
            handleInvalidInput(widget, 'Invalid date');
        }
    });
}

function createTypeaheadWidget(widget) {
    const element = document.createElement('input');
    element.type = 'text';
    element.className = 'widget typeahead';
    element.placeholder = widget.placeholder || '';
    element.title = widget.help || '';
    
    const dropdownContainer = createTypeaheadDropdown();
    addTypeaheadEventListeners(element, dropdownContainer, widget);
    
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.appendChild(element);
    
    return wrapper;
}

function createTypeaheadDropdown() {
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'typeahead-dropdown';
    dropdownContainer.style.display = 'none';
    dropdownContainer.style.position = 'fixed';
    dropdownContainer.style.width = '100%';
    dropdownContainer.style.backgroundColor = '#fff';
    dropdownContainer.style.border = '1px solid #ccc';
    dropdownContainer.style.minHeight = '50px';
    dropdownContainer.style.maxHeight = '200px';
    dropdownContainer.style.overflowY = 'auto';
    dropdownContainer.style.zIndex = '1000';
    dropdownContainer.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    
    document.body.appendChild(dropdownContainer);
    return dropdownContainer;
}

function addTypeaheadEventListeners(element, dropdownContainer, widget) {
    element.addEventListener('input', (e) => handleTypeaheadInput(e, element, dropdownContainer, widget));
    
    element.addEventListener('click', () => {
        if (widget.values) {
            const allValues = widget.values.filter(value => value.text !== '*');
            if (allValues.length > 0) {
                updateDropdownPosition(dropdownContainer, element);
                showTypeaheadOptions(allValues, dropdownContainer, element, widget);
            }
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!element.contains(e.target) && !dropdownContainer.contains(e.target)) {
            dropdownContainer.style.display = 'none';
        }
    });
}

function handleTypeaheadInput(e, element, dropdownContainer, widget) {
    const inputValue = e.target.value.toLowerCase();
    dropdownContainer.innerHTML = '';
    
    updateDropdownPosition(dropdownContainer, element);
    
    if (widget.values) {
        const matchingValues = widget.values.filter(value => 
            value.text !== '*' && value.text.toLowerCase().includes(inputValue)
        );
        
        if (matchingValues.length > 0) {
            showTypeaheadOptions(matchingValues, dropdownContainer, element, widget);
        } else {
            dropdownContainer.style.display = 'none';
        }
    }
}

function updateDropdownPosition(dropdownContainer, element) {
    const rect = element.getBoundingClientRect();
    dropdownContainer.style.top = `${rect.bottom}px`;
    dropdownContainer.style.left = `${rect.left}px`;
    dropdownContainer.style.width = `${rect.width}px`;
}

function showTypeaheadOptions(matchingValues, dropdownContainer, element, widget) {
    dropdownContainer.style.display = 'block';
    matchingValues.forEach(value => {
        const option = createTypeaheadOption(value, element, dropdownContainer, widget);
        dropdownContainer.appendChild(option);
    });
}

function createTypeaheadOption(value, element, dropdownContainer, widget) {
    const option = document.createElement('div');
    option.className = 'typeahead-option';
    option.style.padding = '5px';
    option.style.cursor = 'pointer';
    option.textContent = value.text;
    
    option.addEventListener('mouseover', () => {
        option.style.backgroundColor = '#f0f0f0';
    });
    
    option.addEventListener('mouseout', () => {
        option.style.backgroundColor = '#fff';
    });
    
    option.addEventListener('click', () => {
        element.value = value.text;
        dropdownContainer.style.display = 'none';
        
        if (value.destination) {
            showSlideById(value.destination);
            element.value = '';
        }
    });
    
    return option;
}

function createImageWidget(widget) {
    const element = document.createElement('img');
    element.className = 'widget image';
    element.src = widget.src || '';
    element.alt = widget.alt || '';
    element.title = widget.help || widget.placeholder || '';
    
    element.addEventListener('click', () => {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    });
    
    return element;
}

function createDefaultWidget(widget) {
    const element = document.createElement('div');
    element.className = 'widget';
    element.textContent = widget.text || '';
    element.title = widget.help || widget.placeholder || '';
    return element;
}

function handleInvalidInput(widget, defaultMessage) {
    const coachingEntry = widget.values.find(value => value.text === '*');
    if (coachingEntry) {
        alert(coachingEntry.coaching || defaultMessage);
        if (coachingEntry.destination) {
            showSlideById(coachingEntry.destination);
        }
    }
}

function addPulseIconAndTooltip(element, pulse) {
    const overlay = element.closest('.overlay') || element;
    const pulseIcon = document.createElement('div');
    pulseIcon.className = 'pulse-icon';
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = pulse.text;
    tooltip.style.display = 'none';
    
    pulseIcon.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });
    
    pulseIcon.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    
    overlay.appendChild(pulseIcon);
    overlay.appendChild(tooltip);
}

function showSlideById(slideId) {
    // Hide all slides
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    const slideToShow = document.getElementById(slideId);
    if (slideToShow) {
        slideToShow.style.display = 'block';
        
        const currentSlide = data.slides.find(slide => slide.id === slideId);
        if (currentSlide && currentSlide.simcomplete === 'true') {
            alert('Congratulations! You have completed all slides.');
        }
    }
}