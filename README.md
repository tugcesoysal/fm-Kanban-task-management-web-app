# Frontend Mentor - Kanban task management web app solution

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- **Bonus**: Keep track of any changes, even after refreshing the browser

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React Context API](https://reactjs.org/docs/context.html) - for state management
- [Tailwind CSS](https://tailwindcss.com/) - for utility-first styling

### What I learned

- **React Context API**: I learned how to use the Context API to manage global state across my app, allowing components like the navbar, task list, and board modal to access the same data.
- **Handling Dynamic Forms**: I created dynamic forms for adding and editing tasks, learning how to handle form validation and form submission in React.
- **Responsive Design**: I used Tailwind CSS to implement a mobile-first design approach, ensuring the app was optimized for all screen sizes, from mobile devices to desktops.
- **Task Management**: Managing complex interactions like updating tasks, subtasks, and moving tasks between columns helped me gain a deeper understanding of state management and the immutability concept in React.

```js
const updateTaskStatus = (newStatus, task) => {
  const updatedTask = { ...task, status: newStatus };
  // Update task status logic
  setTask(updatedTask);
};

### Continued development

In future projects, I plan to improve:

- **User Authentication**: Adding user login and authentication would allow users to persist their boards and tasks across devices.
- **Drag and Drop**: Implementing a drag-and-drop interface for tasks will make the app even more interactive.
- **API Integration**: Instead of storing data in the app's local state, I want to connect the app to a backend API to save boards, tasks, and updates persistently.

### Useful resources

- **React Docs** - A great reference for learning React and state management.
- **Tailwind CSS Documentation** - Tailwind's utility classes helped me style the app quickly and efficiently.


## Author

- Website - [Tugce Soysal](https://tugcesoysalportfolio.netlify.app)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/tugcesoysal)



## Acknowledgments

A big thank you to Frontend Mentor for providing the challenge and to the community for the support and feedback. The learning process was a great experience!
```
