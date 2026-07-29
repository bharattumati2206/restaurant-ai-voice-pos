import { create } from "zustand";

const usePosStore = create((set) => ({
  //==========================================
  // Navigation
  //==========================================

  currentScreen: "LOGIN",

  //==========================================
  // Employee
  //==========================================

  currentEmployee: null,

  //==========================================
  // Login
  //==========================================

  enteredPin: "",

  //==========================================
  // Tables
  //==========================================

  selectedTable: null,

  //==========================================
  // Categories
  //==========================================

  selectedCategory: "Appetizers",

  //==========================================
  // Order
  //==========================================

  cart: [],

  //==========================================
  // Voice
  //==========================================

  transcript: "",
  isListening: false,
  isSpeaking: false,
  isAiProcessing: false,

  setIsAiProcessing: (isAiProcessing) =>
    set({
      isAiProcessing,
    }),

  //==========================================
  // AI Timeline
  //==========================================

  timeline: [],

  //==========================================
  // Navigation Actions
  //==========================================

  isAiConsoleOpen: false,

  setAiConsoleOpen: (value) =>
    set({
      isAiConsoleOpen: value,
    }),

  navigate: (screen) =>
    set({
      currentScreen: screen,
    }),

  //==========================================
  // Category Actions
  //==========================================

  setSelectedCategory: (category) =>
    set({
      selectedCategory: category,
    }),

  //==========================================
  // Sub-Item Customization State
  //==========================================

  customizingItem: null,

  setCustomizingItem: (item) =>
    set({
      customizingItem: item,
    }),

  //==========================================
  // Login Actions
  //==========================================

  setPin: (pin) =>
    set({
      enteredPin: pin,
    }),

  appendPin: (digit) =>
    set((state) => ({
      enteredPin: state.enteredPin + digit,
    })),

  clearPin: () =>
    set({
      enteredPin: "",
    }),

  backspacePin: () =>
    set((state) => ({
      enteredPin: state.enteredPin.slice(0, -1),
    })),

  login: (employee) =>
    set({
      currentEmployee: employee,
      currentScreen: "TABLES",
      enteredPin: "",
    }),

  logout: () =>
    set({
      // Navigation
      currentScreen: "LOGIN",

      // Employee
      currentEmployee: null,

      // Login
      enteredPin: "",

      // Tables
      selectedTable: null,

      // Categories
      selectedCategory: "Appetizers",

      // Order
      cart: [],

      // Voice
      transcript: "",
      isListening: false,

      // AI
      timeline: [],
      isAiConsoleOpen: false,
    }),

  //==========================================
  // Table Actions
  //==========================================

  selectTable: (table) =>
    set({
      selectedTable: table,
      currentScreen: "ORDER",
    }),

  activeTableTab: "TABLES",

  setActiveTableTab: (tab) =>
    set({
      activeTableTab: tab,
    }),

  selectedCheckTable: null,

  setSelectedCheckTable: (table) =>
    set({
      selectedCheckTable: table,
    }),

  selectedCheckoutCheck: null,
  setSelectedCheckoutCheck: (check) =>
    set({
      selectedCheckoutCheck: check,
    }),

  selectedOpenCheckId: null,
  setSelectedOpenCheckId: (id) =>
    set({
      selectedOpenCheckId: id,
    }),

  //==========================================
  // Cart Actions
  //==========================================

  setCart: (cart) =>
    set({
      cart,
    }),

  clearCart: () =>
    set({
      cart: [],
    }),

  //==========================================
  // Voice Actions
  //==========================================

  setIsSpeaking: (isSpeaking) =>
    set({
      isSpeaking,
    }),

  setTranscript: (transcript) =>
    set({
      transcript,
    }),

  clearTranscript: () =>
    set({
      transcript: "",
    }),

  setListening: (isListening) =>
    set({
      isListening,
    }),

  //==========================================
  // Timeline Actions
  //==========================================

  addTimeline: (message, type = "info") =>
    set((state) => ({
      timeline: [
        ...state.timeline,
        {
          id: crypto.randomUUID(),
          message,
          type,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  clearTimeline: () =>
    set({
      timeline: [],
    }),
}));

export default usePosStore;
