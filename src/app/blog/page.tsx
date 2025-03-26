"use client";

import { useState, useEffect, useRef } from "react";
import { Column, Flex, Text } from "@/once-ui/components";
import { blog } from "@/app/resources/content";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<{id: string, title: string}[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Mobile view check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load conversations
  useEffect(() => {
    const savedConversations = localStorage.getItem("chat-conversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    // Create new conversation if needed
    if (!currentConversation) {
      const newConversation = {
        id: Date.now().toString(),
        title: input.slice(0, 30),
      };
      setCurrentConversation(newConversation.id);
      setConversations(prev => {
        const updated = [newConversation, ...prev];
        localStorage.setItem("chat-conversations", JSON.stringify(updated));
        return updated;
      });
    }

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // API call to your AI agent
      const response = await fetch("http://localhost:8001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.output,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Save to localStorage
      if (currentConversation) {
        localStorage.setItem(
          `chat-messages-${currentConversation}`,
          JSON.stringify([...messages, userMessage, assistantMessage])
        );
      }
    } catch (error) {
      console.error("API error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      if (isMobile) setSidebarOpen(false);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversation(null);
    if (isMobile) setSidebarOpen(false);
  };

  const loadConversation = (id: string) => {
    const savedMessages = localStorage.getItem(`chat-messages-${id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    setCurrentConversation(id);
    if (isMobile) setSidebarOpen(false);
  };

  // Theme configuration
  const theme = {
    dark: {
      background: "#0f172a",
      sidebar: "#1e293b",
      text: "#f8fafc",
      textSecondary: "#94a3b8",
      userMessage: "#1e40af",
      assistantMessage: "#1e293b",
      inputBackground: "#1e293b",
      inputBorder: "#334155",
      buttonHover: "#334155",
      primary: "#6366f1",
      sidebarWidth: "280px"
    },
  };

  const colors = theme.dark;

  return (
    <Flex style={{ 
      height: "100vh", 
      width: "100vw", 
      overflow: "hidden",
      backgroundColor: colors.background,
      color: colors.text,
      position: "relative"
    }}>
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "fixed",
            top: "16px",
            left: "16px",
            zIndex: 100,
            padding: "8px",
            backgroundColor: colors.primary,
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          {sidebarOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      <div
        style={{
          width: isMobile ? "280px" : colors.sidebarWidth,
          backgroundColor: colors.sidebar,
          borderRight: `1px solid ${colors.inputBorder}`,
          height: "100%",
          overflowY: "auto",
          position: isMobile ? "fixed" : "relative",
          zIndex: 50,
          transform: isMobile ? (sidebarOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ padding: "16px" }}>
          <button
            onClick={startNewConversation}
            style={{
              width: "100%",
              padding: "10px 16px",
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "16px"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Chat
          </button>

          <div style={{ 
            padding: "8px 16px", 
            color: colors.textSecondary, 
            fontSize: "14px",
            borderBottom: `1px solid ${colors.inputBorder}`,
            marginBottom: "8px"
          }}>
            Recent Conversations
          </div>

          <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 180px)" }}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => loadConversation(conv.id)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  textAlign: "left",
                  border: "none",
                  backgroundColor: currentConversation === conv.id ? colors.buttonHover : "transparent",
                  color: colors.text,
                  cursor: "pointer",
                  borderRadius: "6px",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {conv.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <Column
        style={{
          flex: 1,
          height: "100%",
          overflow: "hidden",
          position: "relative",
          marginLeft: isMobile ? "0" : colors.sidebarWidth
        }}
      >
        {/* Messages */}
        <div
          ref={messagesContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            paddingBottom: "120px"
          }}
        >
          {messages.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 200px)",
                color: colors.textSecondary,
                textAlign: "center"
              }}
            >
              <Text variant="heading-strong-m" style={{ color: colors.text, marginBottom: "12px" }}>
                {blog.emptyState.title}
              </Text>
              <Text style={{ color: colors.textSecondary, maxWidth: "400px" }}>
                {blog.emptyState.description}
              </Text>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: "16px",
                  maxWidth: "800px",
                  marginLeft: message.role === "user" ? "auto" : "0",
                  marginRight: message.role === "user" ? "0" : "auto"
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: message.role === "user" ? colors.primary : colors.text,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div
                  style={{
                    backgroundColor: message.role === "user" ? colors.userMessage : colors.assistantMessage,
                    padding: "16px",
                    borderRadius: message.role === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0",
                    color: colors.text
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div
              style={{
                marginBottom: "16px",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: colors.text,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                Assistant
              </div>
              <div
                style={{
                  backgroundColor: colors.assistantMessage,
                  padding: "16px",
                  borderRadius: "12px 12px 12px 0",
                  display: "flex",
                  gap: "8px"
                }}
              >
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: colors.primary, animation: "pulse 1.5s infinite" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: colors.primary, animation: "pulse 1.5s infinite 0.2s" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: colors.primary, animation: "pulse 1.5s infinite 0.4s" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "16px",
            backgroundColor: colors.sidebar,
            borderTop: `1px solid ${colors.inputBorder}`
          }}
        >
          <Flex
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              position: "relative"
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px 48px 12px 16px",
                borderRadius: "20px",
                border: `1px solid ${colors.inputBorder}`,
                backgroundColor: colors.inputBackground,
                color: colors.text,
                minHeight: "48px"
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                backgroundColor: colors.primary,
                border: "none",
                cursor: "pointer",
                color: "white",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Flex>
          <Text
            variant="body-default-xs"
            style={{
              textAlign: "center",
              marginTop: "8px",
              color: colors.textSecondary,
              fontSize: "12px"
            }}
          >
            {blog.disclaimer}
          </Text>
        </form>
      </Column>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </Flex>
  );
}