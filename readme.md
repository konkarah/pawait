# PawaIT Q&A System

A modern full-stack web application that serves as an interactive Q&A system for travel documentation and requirements. Built with FastAPI backend and Next.js frontend, integrated with OpenAI's GPT API.

## 🚀 Features

- **Interactive Chat Interface**: Modern chat-style UI with real-time responses
- **AI-Powered Responses**: Integration with OpenAI GPT-3.5-turbo for accurate travel advice
- **Real-time Communication**: Seamless API communication between frontend and backend
- **Responsive Design**: Clean, mobile-friendly interface built with TailwindCSS
- **Error Handling**: Robust error handling for API failures and network issues

## 🛠 Tech Stack

**Backend:**
- Python
- FastAPI
- OpenAI API
- CORS middleware

**Frontend:**
- Next.js (Pages Router)
- React
- TailwindCSS
- Axios

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- OpenAI API key

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd travel-assistant
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install fastapi uvicorn openai python-dotenv

# Create environment file
echo "OPENAI_API_KEY=your_actual_api_key_here" > .env
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 4. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up/Login
3. Create a new secret key
4. Add it to your `.env` file in the backend directory

## 🚦 Running the Application

### Start Backend Server
```bash
# From root directory
uvicorn main:app --reload
```
Backend will run on `http://localhost:8000`

### Start Frontend Server
```bash
# From frontend directory
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

## 💡 Usage

1. Open your browser and go to `http://localhost:3000`
2. Type your travel-related question in the chat input
3. Example queries:
   - "What documents do I need to travel from Kenya to Ireland?"
   - "What are the visa requirements for US citizens traveling to Japan?"
   - "What vaccinations do I need for travel to Thailand?"

## 🗂 Project Structure

```
pawait/
├── main.py                 # FastAPI backend
├── .env                    # Environment variables (not in repo)
├── .gitignore             # Git ignore rules
├── README.md              # This file
└── frontend/              # Next.js frontend
    ├── pages/
    │   └── index.js       # Main chat interface
    ├── package.json
    └── ...
```

## 🔗 API Endpoints

### POST `/query`
Processes user questions and returns AI-generated responses.

**Request Body:**
```json
{
  "question": "What documents do I need to travel from Kenya to Ireland?"
}
```

**Response:**
```json
{
  "response": "For travel from Kenya to Ireland, you will need..."
}
```

## 🎨 UI Features

- **Clean Chat Interface**: Modern messaging UI with user and AI message bubbles
- **Loading States**: Animated typing indicators during API calls
- **Error Handling**: User-friendly error messages for failed requests
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Empty State**: Helpful suggestions when no messages are present

## 🚀 API Testing

You can test the backend API directly at `http://localhost:8000/docs` for interactive API documentation.

## 🔒 Environment Variables

Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**Important:** Never commit your `.env` file to version control.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for educational and assessment purposes.

## 🔧 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Make sure both servers are running on the correct ports
2. **API Key Issues**: Verify your OpenAI API key is correctly set in `.env`
3. **Module Not Found**: Ensure all dependencies are installed with pip/npm install

**Need Help?**
- Check that both backend (port 8000) and frontend (port 3000) servers are running
- Verify your OpenAI API key has available credits
- Check browser console for any JavaScript errors