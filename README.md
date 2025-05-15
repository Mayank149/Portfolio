# AI-Themed Portfolio Website

A modern, responsive portfolio website with an AI/machine learning theme. Perfect for showcasing your skills, projects, and professional experience in AI, data science, or related tech fields.

## Features

- 🎨 **Modern Design**: Clean, futuristic interface with AI-themed visuals
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Fully Responsive**: Works beautifully on all devices
- ✨ **Interactive Elements**: Particles.js background, typed.js text animations, and more
- 🎯 **Project Filtering**: Filter projects by category (AI/ML, Web Dev, etc.)
- 📊 **Skill Visualization**: Animated skill bars with categories
- 📝 **Contact Form**: Built-in contact form with validation

## Technologies Used

- HTML5 & CSS3
- Vanilla JavaScript
- [Particles.js](https://vincentgarreau.com/particles.js/) - For interactive background
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll library
- [Typed.js](https://mattboldt.com/demos/typed-js/) - For typing animation
- [Font Awesome](https://fontawesome.com/) - For icons

## Getting Started

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/ai-portfolio.git
   cd ai-portfolio
   ```

2. **Install dependencies**
   If you're using npm:
   ```
   npm install
   ```

3. **Start the development server**
   ```
   npm start
   ```

4. **Customize the content**
   - Replace placeholder text in `index.html` with your information
   - Update project details in the Projects section
   - Add your own images to the `img` directory
   - Modify skill levels in the Skills section

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `css/style.css`:

```css
:root {
    --primary-color: #7328ff;
    --secondary-color: #00c8ff;
    /* other variables */
}
```

### Adding Projects

To add a new project, copy the project card HTML structure in the Projects section and update the content:

```html
<div class="project-card" data-category="your-category">
    <!-- Project content -->
</div>
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from various AI and tech websites
- Icons provided by Font Awesome
- Animations powered by AOS and Typed.js 