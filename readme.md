# Landing Page Email Sender

This is a Node.js Express application that provides an email service for katrin landing page.

## Features

1. **Send Emails**: Easily send emails to recipients by making a POST request to the `/api/sendEmail` endpoint.
2. **Rate Limiting**: Implement rate limiting to prevent abuse and ensure fair usage of the email sending functionality. Limit set to 5 requests per hour.
3. **Logging**: Utilize the Morgan middleware to log requests and responses, making it easier to monitor and troubleshoot the application in development mode.
4. **Scalability**: Built on Node.js and Express, the application can be scaled horizontally to handle a large number of email requests.
5. **Error Handling**: Implement error handling to provide meaningful error messages to clients and log errors for debugging purposes.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/photography-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project-directory
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Create a .env file in the root directory and add the following environment variables:

   ```bash
   # .env
    EMAIL_SERVICE=your-email-service
    EMAIL_USER=your-email-username
    EMAIL_PASS=your-email-password
   ```

### Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and visit http://localhost:3000 to view the website.

### License

This project is licensed under the MIT License - see the LICENSE.md file for details.

Make sure to replace placeholders and other relevant details with your actual information.
