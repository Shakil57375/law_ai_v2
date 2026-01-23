# Unused Components & Files Report

## Summary

This report identifies potentially unused or orphaned components, files, and modules in the Law AI application.

---

## 1. **UNUSED COMPONENTS** (Not Imported or Used Anywhere)

### Home Page Components (src/pages/Home/)

These components exist but are NOT used in the current Home.jsx:

**Location:** `src/pages/Home/`

**Note:** These appear to be from an older design iteration. Current Home.jsx uses only:

- Banner, ProblemsSection, WhoIsForSection, HowItWorksSection, TutorialSection, AboutUsSection, BlogSection

---

### Home Page Component Helpers (src/pages/Home/components/)


**Location:** `src/pages/Home/components/`

**Note:** These appear to be for a comparison feature that's not integrated.

---

## 2. **PARTIALLY USED/STUB COMPONENTS**

### Modal Components

- **CustomPricingModal.jsx** ⚠️ STUB IMPLEMENTATION
  - Location: `src/components/Modals/`
  - Content: Only shows `<div>CustomPricingModal</div>`
  - Not imported anywhere
  - Status: Needs implementation or removal

---

## 3. **TEST/DEVELOPMENT COMPONENTS** (Not in Production)

### Test Components (src/components/test/)

- `ChatAreaWithVoice/ChatAreaWithVoice.jsx` 🧪 TEST VERSION
  - Contains voice functionality testing
  - Uses: VoiceRecorder, VoiceMessagePlayer, RichTextDisplay, TokenLimitModal
  - **NOT IMPORTED OR USED** in main App.jsx
  - Should be either integrated or removed

---

## 4. **UTILITY/HELPER COMPONENTS**

### Currently Used:

✅ `ComponentToPrint.jsx` - Referenced but usage unclear
✅ `CloseOutsideClick.jsx` - Used in ChatArea
✅ `ChevronsLeftIcon.jsx` - Used in Sidebar
✅ `MenuIcon.jsx` - Used in Sidebar
✅ `MessageActions.jsx` - Exported but usage unclear
✅ `FeedbackForm.jsx` - Used in Sidebar
✅ `VoiceRecorder.jsx` - Used only in test ChatAreaWithVoice
✅ `VoiceMessagePlayer.jsx` - Used only in test ChatAreaWithVoice
✅ `RichTextDisplay.jsx` - Used in ChatArea and test component

### Unused Utility:

⚠️ `SelectableCalender.jsx` - NOT USED

- Location: `src/components/`
- No imports found

---

## 5. **ORPHANED MODALS**

### Not Imported in App.jsx:

- `TermsAndCondtionModal.jsx` - Expected but not found
- Only: `TermsAndConditions.jsx` page is used instead

### Currently Unused in App.jsx Routes:

⚠️ `ManageSuscription.jsx` - Imported but route NOT defined

- Import at line 28 of App.jsx
- No `/manageSubscription` route visible in current code

---

## 6. **UNUSED ICON/ASSETS COMPONENTS**

No direct unused icon components found, but:

- Multiple `.css` files exist without clear usage:

  - `Instructions.css`
  - `RichTextDisplay.css`
  - `sidebar.css`
  - `style.css`
  - `Modals/VoiceInputModal.css`
  - `SolutionsInAction.css`

---

## 7. **CONTEXT & HOOKS** (All Used)

✅ All hooks are used:

- `useChat.js` - Used in ChatArea
- `useFeedback.js` - Used in Sidebar/FeedbackForm
- `useUser.js` - Used in profile/auth

✅ All contexts are used:

- `AuthContext.jsx` - Used throughout
- `ChatContext.jsx` - Used in ChatArea

---

## 8. **SERVICES** (All Used)

✅ All services are used:

- `axiosClient.js` - Base HTTP client
- `chatAxiosService.js` - Chat API
- `chatService.js` - Chat business logic
- `feedbackService.js` - Used in useFeedback hook
- `userService.js` - Used in useUser hook

---

## 9. **FEATURES FOLDER**

✅ All files used:

- `authApi.js`, `authSlice.js` - Auth state management
- `chatApi.js` - Chat API state
- `subscriptionApi.js` - Subscription management
- `token.js` - Token management
- `tagTypesLIst.jsx` - Tag utilities

---

## 10. **RECOMMENDATION SUMMARY**

### Delete (Safe to Remove):

1. **Home Page Old Components** (entire src/pages/Home/ except Home.jsx and Navbar.jsx):
   - About.jsx, Benefits.jsx, CaseStudy.jsx, CaseUse.jsx, Contact.jsx, Expertise.jsx, Features.jsx, Hero.jsx, Introduction.jsx, SolutionsInAction.jsx, SolutionsInAction.css, Technology.jsx, Testimonials.jsx
   - And sub-folders: components/, data/, styles/

2. **Stub Components**:
   - CustomPricingModal.jsx

3. **Unused Utilities**:
   - SelectableCalender.jsx

4. **Test Components** (if not actively testing):
   - src/components/test/ChatAreaWithVoice/

### Review & Fix:

1. **ManageSuscription Modal** - Verify if needed, add route or remove import
2. **VoiceRecorder & VoiceMessagePlayer** - Decide if voice feature is needed
3. **CustomPricingModal** - Implement or remove (currently just a stub)

### Keep:

- All active components used in Home.jsx
- All modals in use by App.jsx routes
- All hooks, services, and contexts
- All utility components (even if minimal use)

---

## File Structure Analysis

```
src/
├── components/
│   ├── [USED] Main components (ChatArea, Header, Sidebar, Footer, etc.)
│   ├── [USED] Section components (Banner, WhoIsForSection, etc.)
│   ├── [USED] Modals (various modal dialogs)
│   ├── [UNUSED] SelectableCalender.jsx
│   ├── test/
│   │   └── [UNUSED] ChatAreaWithVoice/ (test version)
│   └── Modals/
│       └── [STUB] CustomPricingModal.jsx
├── pages/
│   ├── Home/
│   │   ├── [USED] Home.jsx, Navbar.jsx
│   │   ├── [UNUSED] ~12 old component files
│   │   ├── components/ [UNUSED]
│   │   ├── data/ [UNUSED]
│   │   ├── styles/ [UNUSED]
│   │   └── SolutionsInAction.jsx [UNUSED]
│   ├── [USED] BlogDetailsPage.jsx, LoginPage.jsx, etc.
│   └── [OTHER USED FILES]
├── hooks/
│   └── [ALL USED] useChat.js, useFeedback.js, useUser.js
├── services/
│   └── [ALL USED] All service files
├── context/
│   └── [ALL USED] All context files
└── features/
    └── [ALL USED] All feature slices

```

---

**Generated:** January 23, 2026
**Status:** Application mostly clean, with some legacy components that should be reviewed/removed
