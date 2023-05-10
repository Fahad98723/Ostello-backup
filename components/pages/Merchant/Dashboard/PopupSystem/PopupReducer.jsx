export const initialPopupState = {
  isVisible: false,
  title: "",
  tagline: "",
  successText: "",
  cancelText: "",
  handleSuccess: function (e) {
    ("Success");
  },
  handleCancel: function (e) {
    ("Cancel");
  },
};

export const popupReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        isVisible: true,
        title: action.payload.title,
        tagline: action.payload.tagline,
        successText: action.payload.successText,
        cancelText: action.payload.cancelText,
        handleSuccess: action.payload.handleSuccess,
        handleCancel: action.payload.handleCancel,
      };
    case "HIDE":
      return {
        ...state,
        ...initialPopupState,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
