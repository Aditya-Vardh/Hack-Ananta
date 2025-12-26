'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from '@/components/ChatMessage'
import TypingIndicator from '@/components/TypingIndicator'
import ChatInput from '@/components/ChatInput'

interface Message {
  id: string
  text: string
  isUser: boolean
}

function random(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getBotResponse(text: string): string {
  const lower = text.toLowerCase().trim()
  const words = lower.split(/\s+/)
  
  // Helper to check if message contains any of the keywords
  const hasKeywords = (keywords: string[]) => keywords.some(kw => lower.includes(kw))
  
  // Greetings (Gen Z friendly)
  if (/^(hi|hello|hey|hiya|heya|greetings|sup|what's up|wassup|yo|heyy|hii)$/i.test(lower) || 
      /^(hi|hello|hey)\s/i.test(lower)) {
    return random([
      "Hey! 👋 What's up? How are you doing?",
      "Hi there! How's it going? What's on your mind?",
      "Hey! I'm here to listen. What's going on?",
      "Hi! How are you feeling right now?",
      "Hey! I'm glad you're here. What's up?"
    ])
  }
  
  // Time-based greetings
  if (hasKeywords(['good morning', 'morning'])) {
    return random([
      "Good morning! ☀️ How did you sleep?",
      "Morning! Hope you're starting your day gently.",
      "Good morning! What's on your mind today?"
    ])
  }
  if (hasKeywords(['good afternoon', 'afternoon'])) {
    return random([
      "Good afternoon! How's your day going?",
      "Afternoon! How are you feeling?",
      "Good afternoon! What's happening with you?"
    ])
  }
  if (hasKeywords(['good evening', 'evening', 'good night', 'night'])) {
    return random([
      "Good evening! How was your day?",
      "Evening! Hope you're winding down okay.",
      "Good evening! What's on your mind?"
    ])
  }
  
  // Thank you
  if (hasKeywords(['thank', 'thanks', 'appreciate'])) {
    return random([
      "You're so welcome! I'm glad I could help. 💙",
      "Anytime! I'm here whenever you need to talk.",
      "You're welcome! Remember, I'm always here to listen."
    ])
  }
  
  // Social Media (Gen Z topics)
  if (hasKeywords(['tiktok', 'tik tok', 'instagram', 'insta', 'snapchat', 'snap', 'twitter', 'x app', 'youtube', 'yt', 'social media', 'post', 'posting', 'story', 'stories', 'reels', 'viral', 'followers', 'following', 'unfollow', 'like', 'likes'])) {
    return random([
      "Social media can be a lot, right? 😅 How's it affecting you? Are you feeling the pressure to post or compare?",
      "I get it - social media is everywhere. Do you find yourself scrolling when you're stressed? What's your relationship with it like?",
      "Social media can mess with your head sometimes. Are you feeling okay about your feed or is it getting to you?"
    ])
  }
  
  // FOMO & Comparison
  if (hasKeywords(['fomo', 'missing out', 'everyone else', 'compare', 'comparison', 'better than', 'worse than', 'not good enough', 'inferior'])) {
    return random([
      "FOMO is so real! It's hard seeing everyone else doing things. But remember, social media is just highlights. How are you really feeling?",
      "Comparison is the thief of joy, they say. Are you comparing yourself to others? What's making you feel like you're missing out?",
      "I hear you. It's tough when it feels like everyone else has it figured out. But your journey is yours. What's really bothering you about it?"
    ])
  }
  
  // Dating Apps & Relationships (Gen Z)
  if (hasKeywords(['tinder', 'bumble', 'hinge', 'dating app', 'swipe', 'swiping', 'match', 'matches', 'ghost', 'ghosted', 'breadcrumb', 'situationship'])) {
    return random([
      "Dating apps can be exhausting, honestly. How are you feeling about it? Are you getting burnt out from swiping?",
      "The dating scene is rough out there. Are you dealing with ghosting or just feeling overwhelmed by it all?",
      "Dating apps can mess with your self-esteem sometimes. How's it going? What's the hardest part for you?"
    ])
  }
  
  // Burnout & Overwhelm (Gen Z specific)
  if (hasKeywords(['burnout', 'burnt out', 'can\'t do this', 'too much', 'drowning', 'drained', 'empty', 'nothing left'])) {
    return random([
      "Burnout is so real, especially when you're juggling everything. What's feeling like too much right now?",
      "I hear you - you're running on empty. That's valid. What do you need most right now? Rest? Support?",
      "You're doing a lot, and it's okay to feel drained. What's the biggest thing weighing on you?"
    ])
  }
  
  // Imposter Syndrome
  if (hasKeywords(['imposter', 'fraud', 'don\'t belong', 'not smart enough', 'not qualified', 'fake', 'pretending'])) {
    return random([
      "Imposter syndrome hits hard, especially in school or work. You're not a fraud - you're learning. What's making you feel this way?",
      "I get it. That feeling of 'everyone else knows what they're doing but I don't' is so common. What situation is bringing this up?",
      "You're not faking it - you're figuring it out, and that's okay. What's making you doubt yourself?"
    ])
  }
  
  // Future Anxiety
  if (hasKeywords(['future', 'what am i doing', 'don\'t know what to do', 'career', 'after graduation', 'real world', 'adult', 'adulthood'])) {
    return random([
      "The future can feel scary, especially when everyone's asking 'what's your plan?' It's okay not to have it all figured out. What's your biggest worry?",
      "I hear you - the pressure to have your life mapped out is intense. But you don't need to know everything right now. What's stressing you out about the future?",
      "Future anxiety is so real. It's okay to not know what comes next. What's the scariest part for you?"
    ])
  }
  
  // Climate Anxiety (Gen Z concern)
  if (hasKeywords(['climate', 'global warming', 'environment', 'planet', 'earth', 'pollution', 'climate change'])) {
    return random([
      "Climate anxiety is really heavy, especially for our generation. It's valid to feel worried. How are you coping with it?",
      "I get it - thinking about the planet can be overwhelming. Are you feeling hopeless or trying to do what you can?",
      "Climate stuff is scary. It's okay to feel anxious about it. What's on your mind?"
    ])
  }
  
  // Technology & Programming
  if (hasKeywords(['code', 'coding', 'programming', 'program', 'python', 'javascript', 'java', 'react', 'html', 'css', 'website', 'app', 'software', 'developer', 'computer', 'laptop', 'tech', 'technology'])) {
    return random([
      "That's cool! Are you working on a project? Coding can be frustrating but also super satisfying when it works. What are you building?",
      "Tech stuff is fun but can be overwhelming. Are you learning something new or working on a specific project? What's the vibe?",
      "I'd love to hear more about what you're building or learning! What's the most exciting part for you?"
    ])
  }
  
  // Food & Cooking
  if (hasKeywords(['food', 'eat', 'eating', 'cook', 'cooking', 'recipe', 'meal', 'breakfast', 'lunch', 'dinner', 'hungry', 'pizza', 'burger', 'restaurant'])) {
    return random([
      "Food is important! Are you enjoying cooking or trying new places? What sounds good right now?",
      "Eating well is part of self-care. Have you had something you really enjoyed lately?",
      "Food can be such a comfort. What's your favorite thing to eat when you need a pick-me-up?"
    ])
  }
  
  // Music
  if (hasKeywords(['music', 'song', 'songs', 'listen', 'listening', 'album', 'artist', 'band', 'spotify', 'playlist', 'concert'])) {
    return random([
      "Music is powerful! What kind of music are you into? What's been on repeat for you lately?",
      "I love that music is part of your life. Does music help you process emotions or just enjoy the moment?",
      "What's a song that always makes you feel better? Music can be such great emotional support."
    ])
  }
  
  // Movies & TV
  if (hasKeywords(['movie', 'movies', 'film', 'tv', 'television', 'show', 'series', 'netflix', 'watch', 'watching', 'episode'])) {
    return random([
      "What are you watching? Sometimes a good show or movie is exactly what we need to unwind.",
      "Entertainment can be a great escape. What genre do you usually gravitate toward?",
      "Have you seen anything recently that really stuck with you? I'd love to hear about it."
    ])
  }
  
  // Sports & Fitness
  if (hasKeywords(['sport', 'sports', 'football', 'basketball', 'soccer', 'gym', 'workout', 'exercise', 'running', 'fitness', 'yoga', 'train', 'training'])) {
    return random([
      "Physical activity is great for both body and mind. Are you into any particular sport or activity?",
      "Exercise can be such a good stress reliever. How does it make you feel when you're active?",
      "That's awesome you're into sports/fitness! What do you enjoy most about it?"
    ])
  }
  
  // Games & Gaming (Gen Z friendly)
  if (hasKeywords(['game', 'games', 'gaming', 'gamer', 'play', 'playing', 'video game', 'console', 'xbox', 'playstation', 'nintendo', 'pc game', 'valorant', 'fortnite', 'minecraft', 'apex', 'league', 'overwatch'])) {
    return random([
      "Gaming is such a good escape! What games are you into? Are you playing to unwind or competitively?",
      "I love that gaming is part of your life. Do you play solo or with friends? Gaming with friends can be such a vibe.",
      "What's your favorite game right now? Gaming can be such a good mental break from everything else going on."
    ])
  }
  
  // Memes & Internet Culture
  if (hasKeywords(['meme', 'memes', 'viral', 'trend', 'trending', 'internet', 'online', 'reddit', 'discord', 'streaming', 'streamer'])) {
    return random([
      "Memes are life! 😂 What's your favorite meme right now? Sometimes a good laugh is exactly what you need.",
      "Internet culture is wild. Are you into any specific communities or just vibing with the memes?",
      "The internet can be a lot but also hilarious. What's got you laughing or what's the vibe you're into?"
    ])
  }
  
  // Books & Reading
  if (hasKeywords(['book', 'books', 'read', 'reading', 'novel', 'author', 'library', 'chapter'])) {
    return random([
      "Reading is wonderful! What are you reading? Books can be such great companions.",
      "I'd love to hear about what you're reading. Does reading help you relax or escape?",
      "What genre do you enjoy? Reading can be such a good way to process emotions and learn."
    ])
  }
  
  // Friends & Relationships (Gen Z friendly)
  if (hasKeywords(['friend', 'friends', 'friendship', 'relationship', 'dating', 'boyfriend', 'girlfriend', 'partner', 'crush', 'social', 'bestie', 'best friend', 'friend group', 'squad'])) {
    return random([
      "Friendships can be complicated, right? How are things with your friends? Are you feeling supported or is something off?",
      "Relationships are important but also messy sometimes. What's going on? Are you feeling good about your connections?",
      "I hear you. Friends and relationships can be a lot. What's the situation? Are you feeling like you fit in or feeling left out?"
    ])
  }
  
  // Social Anxiety (Gen Z specific)
  if (hasKeywords(['social anxiety', 'awkward', 'awkwardness', 'don\'t fit in', 'left out', 'excluded', 'weird', 'different', 'don\'t belong', 'outcast'])) {
    return random([
      "Social anxiety is rough. Feeling awkward or like you don't fit in is so common. What situation is making you feel this way?",
      "I get it - feeling like you're the odd one out sucks. You're not alone in feeling this way. What's happening?",
      "Social stuff can be exhausting when you feel like you don't belong. What's making you feel excluded or different?"
    ])
  }
  
  // Family
  if (hasKeywords(['family', 'mom', 'dad', 'mother', 'father', 'parent', 'parents', 'sibling', 'brother', 'sister', 'cousin'])) {
    return random([
      "Family relationships can be complex. How are things at home?",
      "Family dynamics can be challenging. What's going on that you'd like to talk about?",
      "I'm here to listen about your family. What's on your mind?"
    ])
  }
  
  // School/College (Gen Z friendly)
  if (hasKeywords(['school', 'college', 'university', 'class', 'classes', 'professor', 'teacher', 'lecture', 'campus', 'student', 'homework', 'assignment', 'due', 'deadline', 'semester', 'midterm', 'final'])) {
    return random([
      "School is a lot, honestly. How are your classes going? Are you keeping up or feeling behind?",
      "Being a student comes with so much pressure. What's the biggest challenge right now? The workload? The stress?",
      "How are you feeling about school overall? Are you managing okay or is it getting to you?"
    ])
  }
  
  // Part-time Jobs / Side Hustles
  if (hasKeywords(['job', 'work', 'part time', 'side hustle', 'gig', 'shift', 'boss', 'coworker', 'paycheck', 'minimum wage'])) {
    return random([
      "Working while in school is tough! How's your job going? Are you balancing it okay with everything else?",
      "I hear you - juggling work and school is exhausting. What's the hardest part? The hours? The stress?",
      "Work can be a lot, especially when you're also a student. How are you managing? Are you feeling burnt out?"
    ])
  }
  
  // Work/Career
  if (hasKeywords(['work', 'job', 'career', 'boss', 'colleague', 'office', 'interview', 'resume', 'salary'])) {
    return random([
      "Work can be stressful. How are things going at your job?",
      "Career stuff can feel overwhelming. What's on your mind about work?",
      "I'm here to listen about work. What's happening that you'd like to talk about?"
    ])
  }
  
  // Money/Financial (Gen Z friendly)
  if (hasKeywords(['money', 'cash', 'dollar', 'financial', 'budget', 'expensive', 'cheap', 'afford', 'broke', 'rich', 'poor', 'student loans', 'debt', 'rent', 'tuition'])) {
    return random([
      "Money stress is so real, especially as a student. Being broke while everyone seems to have money is rough. What's your situation?",
      "Financial worries can be really heavy. Student life is expensive. How are you managing? Are you stressed about bills?",
      "I hear you about money concerns. It's tough when you're trying to balance everything. What's the biggest worry right now?"
    ])
  }
  
  // Travel
  if (hasKeywords(['travel', 'trip', 'vacation', 'holiday', 'visit', 'flight', 'hotel', 'beach', 'mountains', 'city'])) {
    return random([
      "Travel sounds exciting! Where are you thinking of going or where have you been?",
      "I'd love to hear about your travel plans or experiences. What's the destination?",
      "Travel can be such a great way to reset. Are you planning something or reminiscing?"
    ])
  }
  
  // Weather
  if (hasKeywords(['weather', 'rain', 'sunny', 'cloudy', 'snow', 'cold', 'hot', 'temperature', 'storm'])) {
    return random([
      "Weather can really affect our mood! How's the weather where you are?",
      "I notice weather impacts how I feel too. Is it affecting you today?",
      "What's the weather like? Sometimes a change in weather can change our whole perspective."
    ])
  }
  
  // Sleep
  if (hasKeywords(['sleep', 'sleeping', 'tired', 'exhausted', 'insomnia', 'wake', 'waking', 'bedtime', 'nightmare'])) {
    return random([
      "Sleep is so important for mental health. How have you been sleeping?",
      "Rest isn't giving up. It's recharging. Are you getting enough sleep?",
      "Your body needs rest. Have you been able to get quality sleep lately?"
    ])
  }
  
  // Stress & Anxiety (Gen Z friendly)
  if (hasKeywords(['stress', 'stressed', 'stressing', 'pressure', 'overwhelmed', 'stressed out'])) {
    return random([
      "Yeah… stress can be exhausting 😮‍💨. It's a lot. What's causing the most stress right now? School? Work? Everything?",
      "Sounds like your brain is overloaded. That's valid - you're dealing with a lot. What's one small thing you can do right now?",
      "Stress is real, and so is your strength. What specific situation is stressing you out? Let's talk about it."
    ])
  }
  
  if (hasKeywords(['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'panic', 'panic attack'])) {
    return random([
      "Anxiety can be loud, but you're safe right now. What's making you feel anxious? Is it something specific or just general anxiety?",
      "Let's pause. Take one slow breath with me. What triggered the anxiety? Sometimes naming it helps.",
      "Anxiety is trying to protect you, but you're okay. What's one thing that's actually true right now? Let's ground you."
    ])
  }
  
  // Sad/Lonely
  if (hasKeywords(['lonely', 'sad', 'depressed', 'down', 'unhappy', 'miserable', 'hopeless'])) {
    return random([
      "Lonely days hit hard 💙. You don't have to face it alone here. What's making you feel this way?",
      "I'm really glad you said that. You matter. Can you tell me more about what's going on?",
      "Your feelings are valid. Sometimes just acknowledging them helps. What's on your mind?"
    ])
  }
  
  // Academic (Gen Z friendly)
  if (hasKeywords(['exam', 'test', 'grade', 'study', 'studying', 'homework', 'assignment', 'project', 'deadline', 'gpa', 'fail', 'failing', 'bad grade'])) {
    return random([
      "Exams are scary, but they don't define you. How are you preparing? Are you feeling ready or panicking?",
      "One paper ≠ your entire future. Promise. What subject are you most worried about? Let's talk through it.",
      "You've prepared. You've got this. And even if it doesn't go perfectly, you're still you. What's the exam about? What's stressing you?"
    ])
  }
  
  // Positive feelings (Gen Z friendly)
  if (hasKeywords(['good', 'great', 'happy', 'excited', 'amazing', 'wonderful', 'awesome', 'fantastic', 'love', 'enjoy', 'vibing', 'vibe', 'slaying', 'killing it', 'best day', 'great day'])) {
    return random([
      "That's awesome! I'm so glad you're feeling good! 😊 What's making you feel this way? I love hearing positive vibes!",
      "I love that for you! What's the best part about what's happening? You deserve good things!",
      "That's amazing! It's so nice to hear positive things. Tell me more! What's got you feeling this good?"
    ])
  }
  
  // Gen Z Slang & Casual Responses
  if (hasKeywords(['fr', 'for real', 'no cap', 'deadass', 'lowkey', 'highkey', 'bet', 'period', 'slay', 'slaying', 'vibe', 'vibing', 'sus', 'based', 'cringe', 'yikes'])) {
    return random([
      "Haha, I feel you! 😂 What's going on? Tell me more about what's on your mind.",
      "For real though! What's the situation? I'm here to listen.",
      "I get it! What's up? What's really going on with you?"
    ])
  }
  
  // Questions (context-aware)
  if (lower.startsWith('what')) {
    if (hasKeywords(['do', 'doing'])) {
      return "I'm here to listen and support you. What would you like to talk about?"
    }
    return random([
      "That's a thoughtful question. What's making you think about that?",
      "I hear you. Can you tell me more about what you're asking?",
      "That's worth exploring. What specifically do you want to know?"
    ])
  }
  
  if (lower.startsWith('how')) {
    return random([
      "That's a good question. How are you feeling about it?",
      "I'm curious - how does that relate to what you're going through?",
      "How do you think you'd like to approach that?"
    ])
  }
  
  if (lower.startsWith('why')) {
    return random([
      "That's something worth exploring. Why do you think that is?",
      "I'm curious about what brought that question up. Why is that on your mind?",
      "That's a deep question. Why does it matter to you?"
    ])
  }
  
  if (lower.startsWith('when') || lower.startsWith('where') || lower.startsWith('who')) {
    return random([
      "I'd love to help you think through that. Can you tell me more context?",
      "That's interesting. What's the situation around that?",
      "I'm here to help. What's the full picture?"
    ])
  }
  
  // Short messages
  if (words.length <= 3) {
    return random([
      "I'm listening. Tell me more about that.",
      "Got it. What's on your mind?",
      "I hear you. How does that make you feel?",
      "Thanks for sharing. Want to elaborate?",
      "I'm here. What else is going on?"
    ])
  }
  
  // Context-aware default responses
  // Try to extract topic and respond accordingly
  if (lower.includes('like') || lower.includes('love') || lower.includes('enjoy')) {
    return random([
      "That sounds great! What do you like most about it?",
      "I'm glad you enjoy that! How does it make you feel?",
      "That's wonderful! What draws you to it?"
    ])
  }
  
  if (lower.includes('hate') || lower.includes('dislike') || lower.includes('don\'t like')) {
    return random([
      "I hear that. What makes you feel that way about it?",
      "That's valid. Can you tell me more about why?",
      "I understand. What's the hardest part about it?"
    ])
  }
  
  if (lower.includes('help') || lower.includes('need')) {
    return random([
      "I'm here to help. What do you need support with?",
      "Let's figure this out together. What's the main challenge?",
      "I'm listening. What would be most helpful right now?"
    ])
  }
  
  if (lower.includes('problem') || lower.includes('issue') || lower.includes('trouble')) {
    return random([
      "I'm here to help you work through it. What's the problem?",
      "Let's break it down. What's the main issue?",
      "I'm listening. Can you tell me more about the trouble you're facing?"
    ])
  }
  
  // General empathetic responses (Gen Z friendly)
  return random([
    "I hear you. That sounds important. Can you tell me more about it? What's really going on?",
    "Thanks for sharing that. How does that make you feel? I'm here to listen.",
    "I'm listening. What's the most significant part of that for you? Let's talk through it.",
    "That's worth talking about. What would help you right now? I'm here for you.",
    "I appreciate you opening up. What's on your mind about it? You're not alone in this.",
    "I'm here to support you. How are you handling that? It's okay to not be okay.",
    "That sounds meaningful. What's your biggest concern about it? Let's figure it out together.",
    "I understand. What do you need most right now? Support? Advice? Just someone to listen?",
    "Thanks for trusting me with that. How can I help? I'm here whenever you need.",
    "I'm glad you're talking about it. What else should I know? You've got this."
  ])
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi 👋 I'm here to listen.\n\nThis is emotional support, not medical advice.\n\nHow are you feeling today?",
      isUser: false,
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(text),
      isUser: false,
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botResponse])
  }

  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-4xl min-h-[85vh] max-h-[90vh] md:max-h-[85vh] flex flex-col bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-emerald-500/10"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-2xl"
            >
              🧠
            </motion.div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Student Mental Support
              </h1>
              <p className="text-xs md:text-sm text-white/60">
                Emotional support, not medical advice
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </motion.div>
    </div>
  )
}

