
// ===== SLIDE FROM DIRECTION ===== 
export const slideFromBottom = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { y: 50, opacity: 0, transition: {duration: 0.2} }
}

export const slideFromBottomShort = {
  hidden: { y: 10, opacity: 0}, 
  visible: { y: 0, opacity: 1, transition: {duration: 0.6} }, 
  exit: { y: 30, opacity: 0, transition: {duation: 0.2} }
}

export const slideFromTop = {
  hidden: { y: -40, opacity: 0}, 
  visible: { y: 0, opacity: 1, transition: {duration: 0.6}}
}

export const slideFromBottomSmall = {
    hidden: { y: 40, opacity: 0}, 
    visible: { y: 0, opacity: 1}
}

export const slideFromLeft = {
  hidden: { x: -20, opacity: 0}, 
  visible: { x: 0, opacity: 1, transition: {duration: 0.4}}
}

export const slideFromLeftLong = {
  hidden: { x: -50, opacity: 0}, 
  visible: { x: 0, opacity: 1, transition: {duration: 0.4}}
}

export const slideFromRight = {
  hidden: { x: 20, opacity: 0}, 
  visible: { x: 0, opacity: 1, transition: {duration: 0.4}}
}

export const slideFromRightLong = {
  hidden: { x: 40, opacity: 0}, 
  visible: { x: 0, opacity: 1, transition: {duration: 0.4}}
}

// ===== MODAL ANIMATIONS =====
export const modalSlide = {
  hidden: { y: 200, opacity: 0}, 
  visible: { y: 0, opacity: 1, transition: {duration: 0.5}}, 
  exit: { y: 50 , opacity: 0, transition: {duration: 0.3} }
}

export const modalFade = {
  hidden: {opacity: 0}, 
  visible: {opacity: 1, transition: {duration: 0.5}},
  exit: { opacity: 0, transition: {duration: 0.3}}
}

export const modalSpring = {
  hidden: {opacity: 0, scale: 0}, 
  visible: {opacity: 1, scale: 1, transition: {duration: 0.5}},
  exit: {opacity: 0, scale: 0, transition: {duration: 0.3}}
}


// ===== STAGGER ANIMATIONS ===== 
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1, // starts after header finishes animating
        staggerChildren: 0.2, // each child animates in sequence
      },
    },
  };
  
  export const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };


// ===== PANTRY CARD ===== 
export const pantryCardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  tap: {
    scale: 0.94
  }, 
  hover: {
    scale: 1.035, 
    transition: {duration: 0.3}
  }
}


// ===== RADIO BUTTON VARIANTS =====
export const radioInputsVariants = {
    inactive: {
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.23)",
        backgroundColor: "#ffffff",
        transition: { duration: 0.2 }
    }, 
    active: {
        backgroundColor: "#FFD2AD", 
        boxShadow: "0 0 0",
        color: "rgba(0, 0, 0)", 
        transition: { duration: 0.5 }
    }
}

// ===== SPRING ANIMATION =====
export const springVariant = {
    hidden: {scale: 0, opacity: 0}, 
    visible: {scale: 1, opacity: 1}, 
    transition: {
        duration: 0.2, 
        type: "spring", 
        stiffness: 400, 
        damping: 25
    }
}

export const slowSpringVariant = {
  hidden: {scale: 0, opacity: 0}, 
  visible: {scale: 1, opacity: 1, 
    transition: {
      duration: 2, 
      type: "spring", 
      stiffness: 400, 
      damping: 25
  }}, 
}

// CALENDAR 
export const calendarVariants = {
  active: {
    backgroundColor: "#FE9844",
    border: "2px solid #FE9844",
    color: "rgb(255, 255, 255)", 
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.25)", 
    transition: { duration: 0.5, ease: "easeInOut"}
  }, 
  inactive: {
    border: "2px solid #CECECE", 
    color: "rgb(0, 0, 0)"
  }, 
  today: {
    border: "2px solid #FE9844"
  }
}

// STEPS 
export const stepVariants = {
  active: {
    backgroundColor: "#FE9844", 
    transition: { duration: 0.5, ease: "easeInOut"}

  },

  inactive: {
    backgroundColor: "#CECECE", 
    transition: { duration: 0.5, ease: "easeInOut"}
  }
}

// ===== NAVBAR ===== 
export const navSideBarVariants = {
  inactive: {
    backgroundColor: "transparent",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    scale: 1
  },

  active: {
    backgroundColor: "#FE9844",
    borderRadius: "50px",
    boxShadow: "0px 2px 3px rgba(0,0,0,0.25)",
    scale: 1,
    transition: { duration: 0.35 }
  }
};

// ===== TOGGLE SCALE ===== 
export const scaleSelect = {
  inactive: {
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
    scale: 1, 
    backgroundColor: "#FFFFFF"
  }, 
  active: {
    boxShadow: "none", 
    scale: 0.95, 
    transition: {duration: 0.5}, 
    backgroundColor: "#FFB172"
  }
}

// TOGGLE NUTRI 
export const scaleNutri = {
  inactive: {
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
    scale: 1, 
    backgroundColor: "#F0F0F2"
  }, 
  active: {
    boxShadow: "none", 
    scale: 0.98, 
    transition: {duration: 0.5}, 
    backgroundColor: "#FFB172"
  }
}

// SCALE 
export const scaleVariant = {
  inactive: {
    scale: 1, 
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)", 
    transition: {duration: 0.5}
  }, 
  active: {
    scale: 1.1, 
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.5)", 
    transition: {duration: 0.5}
  }, 
  exit: {
    scale: 1, 
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)", 
    transition: {duration: 0.5}
  }
}

export const scaleVariantSmall = {
  inactive: {
    scale: 1, 
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)", 
    transition: {duration: 0.5}
  }, 
  active: {
    scale: 1.03, 
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.5)", 
    transition: {duration: 0.5}
  }, 
  exit: {
    scale: 1, 
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)", 
    transition: {duration: 0.5}
  }
}

// BUTTON HOVER ANIMATION 
export const buttonHoverClickVariant = {
  tap: {
    scale: 0.94
  }, 
  hover: {
    scale: 1.035, 
    transition: {duration: 0.3}
  }
}

// INPUT HOVER ANIMATION 
export const inputHoverClickVariant = {
  focus: {
    boxShadow: "inset 0px 3px 4px rgba(0, 0, 0, 0.4)"
  }, 
  hover: {
    boxShadow: "inset 0px 3px 4px rgba(0, 0, 0, 0.4)",
    transition: { duration: 0.5 }
  }
}

// HEADER BUTTON 
export const headerButtonVariant = {
  hidden: { x: 20, opacity: 0}, 
  visible: { x: 0, opacity: 1, transition: {duration: 0.4}}, 
  hover: {
    scale: 1.035, 
    transition: {duration: 0.3}
  }, 
  tap: {
    scale: 0.94
  }
}

export const headerButtonVariantLeft = {
  hidden: { x: -20, opacity: 0}, 
  visible: { x: 0, opacity: 1, transition: {duration: 0.4}}, 
  hover: {
    scale: 1.035, 
    transition: {duration: 0.3}
  }, 
  tap: {
    scale: 0.94
  }
}

export const generateVariant = {
  hover: {
    scale: 1.035, 
    transition: {duration: 0.3}
  }, 
  inactive: {
    scale: 1, 
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#ffffff",
    transition: {duration: 0.3}
  },
  active: {
    scale: 0.999, 
    backgroundColor: "#FFD2AD", 
    boxShadow: "none",
    transition: {duration: 0.3}
  }, 
  exit: {
    scale: 1, 
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)", 
    transition: {duration: 0.5}
  }
}

// NAVBAR ANIMATION 
export const navBar = {
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.3}
  }, 
  tap: {
    scale: 0.85
  }
}