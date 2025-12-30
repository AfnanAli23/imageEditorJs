# Image Editor – JS

## Overview

This project implements a **client-side image editor** using JavaScript and the HTML Canvas API. It allows users to upload an image, apply multiple visual filters in real time, reset changes, download the edited image, and instantly apply predefined filter presets such as *vintage*, *cinema*, and *noir*.

The entire editor works without any backend, relying fully on browser capabilities.

---

## Core Architecture

The application is structured around four major components:

1. **Filter Configuration System**
2. **Dynamic Filter UI Generation**
3. **Canvas-Based Image Rendering**
4. **Preset and Utility Controls**

Each component is modular and interacts through shared state.

---

## Filter Configuration System

All available image filters are centrally defined in a single configuration object. Each filter contains:

* **Current value** – the actively applied value
* **Default value** – used for reset functionality
* **Minimum and maximum bounds** – used by UI sliders
* **Unit** – required for CSS filter syntax

This design ensures:

* Consistent behavior across UI and logic
* Easy addition or removal of filters
* Clean separation of data and behavior

---

## Dynamic Filter UI Creation

Instead of writing static HTML for each filter, the UI is generated dynamically.

### How It Works

* A reusable function creates filter UI elements.
* For each filter:

  * A container is created
  * A label is displayed using a formatted filter name
  * A range slider is configured using the filter’s min, max, and default values
* All filter elements are appended to a common container

### Real-Time Interaction

Each slider listens for input changes. When the user moves a slider:

* The corresponding filter value is updated in the central filter object
* The image is immediately re-rendered with updated filter values

This provides a smooth, real-time editing experience.

---

## Canvas Image Handling

### Image Upload Flow

* The user selects an image via a file input
* A placeholder element is hidden once an image is selected
* The selected image is loaded into memory
* The canvas size automatically adjusts to match the image dimensions
* The image is drawn onto the canvas

This ensures pixel-perfect rendering without distortion.

---

## Filter Application Logic

All active filters are applied using the Canvas 2D context’s filtering capability.

### Key Characteristics

* Filters are combined into a single filter string
* Each filter uses its respective value and unit
* The original image is redrawn every time filters change
* This prevents cumulative distortion and ensures accuracy

The system always redraws from the original image rather than stacking transformations.

---

## Reset Functionality

The reset feature restores the editor to its original state.

### Reset Behavior

* All filter values revert to their default settings
* UI sliders are synchronized with reset values
* The canvas is re-rendered with default filters

This ensures both the internal state and UI remain consistent.

---

## Image Download Feature

Users can export their edited image directly from the browser.

### Download Flow

* The canvas content is converted into an image format
* A temporary download link is generated
* The edited image is automatically downloaded

This process does not require server interaction or external libraries.

---

## Preset System

The editor includes a comprehensive preset mechanism for quick styling.

### Preset Structure

Each preset defines a complete set of filter values that together produce a specific visual mood, such as:

* Vintage
* Cinema
* Noir
* Warm
* Cool
* Dramatic
* Dreamy
* Retro
* Monochrome
* Cinematic Cool

### Applying a Preset

When a preset is selected:

* Each filter value is updated from the preset configuration
* UI sliders reflect the preset values
* Filters are immediately applied to the image

This allows users to experiment with professional-looking effects in a single click.

---

## State Management Design

The application maintains a **single source of truth** for filter values. Both UI controls and presets modify the same filter state object, ensuring:

* No UI desynchronization
* Predictable behavior
* Easier debugging and extension

---

## Scalability and Extensibility

The architecture supports easy future enhancements:

* New filters can be added with minimal changes
* Additional presets can be defined without modifying core logic
* UI generation automatically adapts to new filters

---

## Summary

This image editor demonstrates a clean and modular approach to browser-based image manipulation. By combining dynamic UI creation, centralized state management, and canvas rendering, it delivers a responsive and extensible editing experience entirely on the client side.

---
# Learned from @Sheryians Coding School
