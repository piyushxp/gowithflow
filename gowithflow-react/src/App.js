import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data';

// Define widget types as constants
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

function App() {
  // State to track the current slide ID
  const [currentSlideId, setCurrentSlideId] = useState(null);

  // Initialize with the first slide
  useEffect(() => {
    if (data.slides && data.slides.length > 0) {
      setCurrentSlideId(data.slides[0].id);
    }
  }, []);

  // Function to show a slide by ID
  const showSlideById = (slideId) => {
    setCurrentSlideId(slideId);
    
    // Check if this is the completion slide
    const currentSlide = data.slides.find(slide => slide.id === slideId);
    if (currentSlide && currentSlide.simcomplete === 'true') {
      alert('Congratulations! You have completed all slides.');
    }
  };

  // Function to handle invalid input
  const handleInvalidInput = (widget, defaultMessage) => {
    const coachingEntry = widget.values.find(value => value.text === '*');
    if (coachingEntry) {
      alert(coachingEntry.coaching || defaultMessage);
      if (coachingEntry.destination) {
        showSlideById(coachingEntry.destination);
      }
    }
  };

  return (
    <div className="slide-container">
      {data.slides.map(slide => (
        <Slide 
          key={slide.id} 
          slide={slide} 
          isVisible={slide.id === currentSlideId}
          showSlideById={showSlideById}
          handleInvalidInput={handleInvalidInput}
        />
      ))}
    </div>
  );
}

// Slide component
function Slide({ slide, isVisible, showSlideById, handleInvalidInput }) {
  return (
    <div className="slide" style={{ display: isVisible ? 'block' : 'none' }} id={slide.id}>
      <img src={slide.file} alt={slide.slide_name} />
      {slide.widgets && slide.widgets.map((widget, index) => (
        <Widget 
          key={widget.widget_unique_key || `widget-${index}`}
          widget={widget}
          showSlideById={showSlideById}
          handleInvalidInput={handleInvalidInput}
        />
      ))}
    </div>
  );
}

// Widget component that renders different widget types
function Widget({ widget, showSlideById, handleInvalidInput }) {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOptionClick = (value) => {
    if (widget && value.destination) {
      showSlideById(value.destination);
      setShowDropdown(false);
    }
  };

  // For text widgets, position directly without overlay
  if (widget.type === WIDGET_TYPES.TEXT) {
    const [left, top, right, bottom] = widget.rect.split(',').map(Number);
    return (
      <div 
        className="widget text"
        style={{
          position: 'absolute',
          left: `${left}px`,
          top: `${top}px`,
          width: `${right - left}px`,
          height: `${bottom - top}px`,
          ...widget.styles
        }}
        title={widget.help || widget.placeholder || ''}
      >
        {widget.text || ''}
        {widget.pulse && widget.pulse.text && <PulseIcon pulse={widget.pulse} />}
      </div>
    );
  }

  // For other widgets, create overlay with orange border
  const [left, top, right, bottom] = widget.rect.split(',').map(Number);
  return (
   <div>
     <div 
      className="overlay"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${right - left}px`,
        height: `${widget.type === WIDGET_TYPES.TYPEAHEAD ? 'inherit' : bottom - top}px`
      }}
    >
      <WidgetElement 
        widget={widget} 
        showSlideById={showSlideById} 
        handleInvalidInput={handleInvalidInput} 
        setFilteredOptions={setFilteredOptions}
        setShowDropdown={setShowDropdown}
      />
      {widget.pulse && widget.pulse.text && <PulseIcon pulse={widget.pulse} />}
    </div>

    {widget.type === WIDGET_TYPES.TYPEAHEAD && showDropdown && (
      <TypeaheadDropdown 
        options={filteredOptions}
        widget={widget}
        overlayRect={{ left, top, right, bottom }}
        onOptionClick={handleOptionClick}
        setShowDropdown={setShowDropdown}
      />
    )}
   </div>
  );
}

// Component for the pulse icon and tooltip
function PulseIcon({ pulse }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <>
      <div 
        className="pulse-icon" 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      ></div>
      <div 
        className="tooltip" 
        style={{ display: showTooltip ? 'block' : 'none' }}
      >
        {pulse.text}
      </div>
    </>
  );
}

// Component that renders the appropriate widget based on type
function WidgetElement({ widget, showSlideById, handleInvalidInput, setFilteredOptions, setShowDropdown }) {
  switch(widget.type) {
    case WIDGET_TYPES.HOTSPOT:
      return <HotspotWidget widget={widget} showSlideById={showSlideById} />;
      
    case WIDGET_TYPES.BUTTON:
      return <ButtonWidget widget={widget} showSlideById={showSlideById} />;
      
    case WIDGET_TYPES.TEXTBOX:
      return <TextboxWidget widget={widget} showSlideById={showSlideById} handleInvalidInput={handleInvalidInput} />;
      
    case WIDGET_TYPES.MENU:
      return <MenuWidget widget={widget} showSlideById={showSlideById} handleInvalidInput={handleInvalidInput} />;
      
    case WIDGET_TYPES.DATEPICKER:
      return <DatepickerWidget widget={widget} showSlideById={showSlideById} handleInvalidInput={handleInvalidInput} />;

    case WIDGET_TYPES.TYPEAHEAD:
      return <TypeaheadWidget 
        widget={widget} 
        showSlideById={showSlideById} 
        handleInvalidInput={handleInvalidInput}
        setFilteredOptions={setFilteredOptions}
        setShowDropdown={setShowDropdown}
      />;
      
    case WIDGET_TYPES.IMAGE:
      return <ImageWidget widget={widget} />;
      
    default:
      return <DefaultWidget widget={widget} />;
  }
}

// Individual widget type components
function HotspotWidget({ widget, showSlideById }) {
  return (
    <div 
      className="widget hotspot"
      title={widget.help || widget.placeholder || ''}
      onClick={() => widget.destination && showSlideById(widget.destination)}
    ></div>
  );
}

function ButtonWidget({ widget, showSlideById }) {
  return (
    <button 
      className="widget button"
      title={widget.help || widget.placeholder || ''}
      onClick={() => widget.destination && showSlideById(widget.destination)}
    >
      {widget.text || ''}
    </button>
  );
}

function TextboxWidget({ widget, showSlideById, handleInvalidInput }) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const matchedValue = widget.values.find(value => value.text === inputValue && value.text !== '*');
    
   
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const inputValue = e.target.value;
      const matchedValue = widget.values.find(value => value.text === inputValue && value.text !== '*');
      
      if (matchedValue && matchedValue.destination) {
        showSlideById(matchedValue.destination);
        e.target.value = '';
      } else {
        handleInvalidInput(widget, 'Invalid input');
      }
    }
  };

  return (
    <input 
      type="text"
      className="widget textbox"
      placeholder={widget.placeholder || ''}
      title={widget.help || ''}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}

function MenuWidget({ widget, showSlideById, handleInvalidInput }) {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const matchedValue = widget.values.find(value => value.text === selectedValue && value.text !== '*');
    
    // if (matchedValue && matchedValue.destination) {
    //   showSlideById(matchedValue.destination);
    //   e.target.value = '';
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const selectedValue = e.target.value;
      const matchedValue = widget.values.find(value => value.text === selectedValue && value.text !== '*');
      
      if (matchedValue && matchedValue.destination) {
        showSlideById(matchedValue.destination);
        e.target.value = '';
      } else {
        handleInvalidInput(widget, 'Invalid selection');
      }
    }
  };

  const uniqueValues = widget.values ? widget.values.filter((value, index, self) => 
    value.text !== '*' && self.findIndex(v => v.text === value.text) === index
  ) : [];

  return (
    <select 
      className="widget menu"
      title={widget.help || widget.placeholder || ''}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    >
      {uniqueValues.map((value, index) => (
        <option 
          key={index} 
          value={value.text || ''}
          data-destination={value.destination || ''}
        >
          {value.text || ''}
        </option>
      ))}
    </select>
  );
}

function DatepickerWidget({ widget, showSlideById, handleInvalidInput }) {
  const handleChange = (e) => {
    const selectedDate = e.target.value;
    const matchedValue = widget.values.find(value => value.text === selectedDate && value.text !== '*');
    
    // if (matchedValue && matchedValue.destination) {
    //   showSlideById(matchedValue.destination);
    //   e.target.value = '';
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const selectedDate = e.target.value;
      const matchedValue = widget.values.find(value => value.text === selectedDate && value.text !== '*');
      
      if (matchedValue && matchedValue.destination) {
        showSlideById(matchedValue.destination);
        e.target.value = '';
      } else {
        handleInvalidInput(widget, 'Invalid date');
      }
    }
  };

  return (
    <input 
      type="date"
      className="widget datepicker"
      placeholder={widget.placeholder || ''}
      title={widget.help || ''}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}

function TypeaheadDropdown({ widget, overlayRect, options, onOptionClick }) {
  const dropdownRef = React.useRef(null);

  const dropdownStyle = overlayRect ? {
    position: 'absolute',
    top: `${overlayRect.bottom}px`,
    left: `${overlayRect.left}px`,
    width: `${overlayRect.right - overlayRect.left}px`
  } : {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%'
  };

  return (
    <div 
      ref={dropdownRef}
      className="typeahead-dropdown"
      style={{
        ...dropdownStyle,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxHeight: '200px',
        overflowY: 'auto',
        zIndex: 9999,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginTop: '2px'
      }}
    >
      {options.map((value, index) => (
        <div 
          key={index}
          className="typeahead-option"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            transition: 'backgroundColor 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
          onClick={() => onOptionClick(value)}
        >
          {value.text}
        </div>
      ))}
    </div>
  );
}

function TypeaheadWidget({ widget, showSlideById, handleInvalidInput, setFilteredOptions, setShowDropdown }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (widget.values) {
      const matchingValues = widget.values.filter(val => 
        val.text !== '*' && val.text.toLowerCase().includes(value.toLowerCase())
      );
      
      setFilteredOptions(matchingValues);
      setShowDropdown(matchingValues.length > 0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const matchedValue = widget.values.find(value => 
        value.text.toLowerCase() === inputValue.toLowerCase() && value.text !== '*'
      );
      
      if (matchedValue && matchedValue.destination) {
        showSlideById(matchedValue.destination);
        setInputValue('');
      } else {
        handleInvalidInput(widget, 'Invalid input');
      }
    }
  };

  const handleOptionClick = (value) => {
    setInputValue(value.text);
    setShowDropdown(false);
    
    if (value.destination) {
      showSlideById(value.destination);
      setInputValue('');
    }
  };

  const handleInputClick = () => {
    if (widget.values) {
      const allValues = widget.values.filter(value => value.text !== '*');
      if (allValues.length > 0) {
        setFilteredOptions(allValues);
        setShowDropdown(true);
      }
    }
  };

  return (
    <input 
      ref={inputRef}
      type="text"
      className="widget typeahead"
      placeholder={widget.placeholder || ''}
      title={widget.help || ''}
      value={inputValue}
      onChange={handleInputChange}
      onClick={handleInputClick}
      onKeyPress={handleKeyPress}
    />
  );
}

function ImageWidget({ widget }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <img 
      className="widget image"
      src={widget.src || ''}
      alt={widget.alt || ''}
      title={widget.help || widget.placeholder || ''}
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={() => setIsVisible(!isVisible)}
    />
  );
}

function DefaultWidget({ widget }) {
  return (
    <div 
      className="widget"
      title={widget.help || widget.placeholder || ''}
    >
      {widget.text || ''}
    </div>
  );
}

export default App;
