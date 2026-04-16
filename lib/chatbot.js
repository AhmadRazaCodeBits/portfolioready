// Chatbot logic - keyword matching engine
// Matches user questions to portfolio data patterns

export function getChatbotResponse(message, responses) {
  const msg = message.toLowerCase().trim();

  // Greeting patterns
  if (/^(hi|hello|hey|hola|sup|yo|greetings|assalam|salam)/i.test(msg)) {
    return responses.greeting;
  }

  // Skills patterns
  if (/skill|tech|stack|tool|language|framework|proficien|know|can you|what.*use/i.test(msg)) {
    return responses.skills;
  }

  // Experience patterns
  if (/experience|work|job|career|company|employ|where.*work|current/i.test(msg)) {
    return responses.experience;
  }

  // Projects patterns
  if (/project|portfolio|built|build|made|create|app|website|application/i.test(msg)) {
    return responses.projects;
  }

  // Education patterns
  if (/education|degree|university|college|study|studi|school|qualif|bs|bachelor/i.test(msg)) {
    return responses.education;
  }

  // Contact patterns
  if (/contact|email|phone|reach|connect|message|call|social/i.test(msg)) {
    return responses.contact;
  }

  // Hire / availability patterns
  if (/hire|avail|freelance|opportunity|open|looking|recruit|engag/i.test(msg)) {
    return responses.hire;
  }

  // Location patterns
  if (/location|where|live|based|city|countr|from/i.test(msg)) {
    return responses.location;
  }

  // Name / about patterns
  if (/name|who|about|yourself|tell.*about|introduce/i.test(msg)) {
    return `I'm the portfolio assistant for Ahmad Raza — a skilled MERN Stack Developer based in Lahore, Pakistan. ${responses.skills}`;
  }

  // Fallback
  return responses.fallback;
}

export const suggestedQuestions = [
  "What skills do you have?",
  "Tell me about your experience",
  "What projects have you built?",
  "How can I contact you?",
  "Are you available for hire?",
  "What's your education?",
];
