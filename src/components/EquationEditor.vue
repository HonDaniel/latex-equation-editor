<template>
  <div class="editor-container">
    <ButtonPanel
      :categories="buttonCategories"
      @button-click="addLatex"
      @show-fraction-popup="openFractionPopup"
      @show-sqrt-popup="openSqrtPopup"
      @show-root-popup="openRootPopup"
      @show-exponential-popup="OpenExponentialPopup"
      @show-integral-popup="openIntegralPopup"
      @show-ointegral-popup="openOIntegralPopup"
      @show-derivative-popup="openDerivativePopup"
      @show-pderivative-popup="openPDerivativePopup"
      @show-partial-popup="openPDerivativePopup"
      @show-summa-popup="openSummaPopup"
      @show-product-popup="openProductPopup"
      @show-lim-popup="openLimPopup"
      
/>
    <textarea
      class="latex-input"
      v-model="latexCode"
      placeholder="Type or use buttons to insert LaTeX"
      @input="updatePreview"
    ></textarea>

    <div class="latex-output" v-html="renderedOutput"></div>

    <button @click="clearEditor" class="clear-button">Clear</button>

    <GenericPopup
      v-if="showGenericPopup"
      :title="popupTitle"
      :fields="popupFields"
      @submit="handlePopupSubmit"
      @close-popup="showGenericPopup = false"
      
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import katex from "katex";
import "katex/dist/katex.min.css";
import ButtonPanel from "./ButtonPanel.vue";
import GenericPopup from "./GenericPopup.vue";

export default {
  components: { ButtonPanel, GenericPopup },
  setup() {
    const latexCode = ref("");
    const showGenericPopup = ref(false);
    const popupTitle = ref("");
    const popupFields = ref([]);
    const buttonCategories = ref([
  {
    title: "Calculus",
    buttons: [
      { label: "Fraction", event: "show-fraction-popup" },
      { label: "Square Root", event: "show-sqrt-popup" },
      { label: "Root", event: "show-root-popup"},
      { label: "Exponential", event: "show-exponential-popup"},
      { label: "Derivative", event: "show-derivative-popup" },
      { label: "PDerivative", event: "show-pderivative-popup"},
      { label: "Integral", event: "show-integral-popup" },
      { label: "O-Integral", event: "show-ointegral-popup" },
      { label: "Summa", event: "show-summa-popup"},
      { label: "Product", event: "show-product-popup"},
      { label: "Limit", event: "show-lim-popup"},
    ],
  },
  {
    title: "Greek Letters",
    buttons: [
      { label: "alpha", code: "\\alpha" },
      { label: "beta", code: "\\beta" },
      { label: "gamma", code: "\\gamma" },
      { label: "delta", code: "\\delta"},
      { label: "epsilon", code: "\\epsilon" },
      { label: "zeta", code: "\\zeta" },
      { label: "eta", code: "\\eta" },
      { label: "theta", code: "\\theta"},
      { label: "iota", code: "\\iota" },
      { label: "kappa", code: "\\kappa" },
      { label: "lambda", code: "\\lambda" },
      { label: "mu", code: "\\mu"},
      { label: "nu", code: "\\nu" },
      { label: "xi", code: "\\xi" },
      { label: "omicron", code: "\\omicron" },
      { label: "pi", code: "\\pi"},
      { label: "rho", code: "\\rho" },
      { label: "sigma", code: "\\sigma" },
      { label: "tau", code: "\\tau" },
      { label: "upsilon", code: "\\upsilon"},
      { label: "phi", code: "\\phi" },
      { label: "chi", code: "\\chi" },
      { label: "psi", code: "\\psi" },
      { label: "omega", code: "\\omega"},


    ],
  },
  {
    title: "Logical Operators",
    buttons: [
      { label: "And", code: "\\land" },
      { label: "Or", code: "\\lor" },
      { label: "Not", code: "\\neg" },
    ],
  },
  {
    title: "Basic Operators",
    buttons: [
      { label: "Equal", code: "=" },
      { label: "Addition", code: "+" },
      { label: "Substraction", code: "-" },
      { label: "Multiplication", code: "\\times" },
      { label: "Division", code: "\\div" },
      { label: "Lesser", code: "\\lt" },
      { label: "Greater", code: "\\gt" },
      { label: "Less Equal", code: "\\le" },
      { label: "Greater Equal", code: "\\ge" },
      { label: "Not Lesser", code: "\\nless" },
      { label: "Not Greater", code: "\\ngtr" },
      { label: "Not Lesser Equal", code: "\\nleq" },
      { label: "Not Greater Equal", code: "\\ngeq" },
    ],
  },
  {
    title: "Signs",
    buttons: [
      { label: "Infinity", code: "\\infty" },
      { label: "Pi", code: "\\pi" },
      { label: "Approx", code: "\\approx" },
    ],
  },
]);

    const renderedOutput = computed(() => {
      try {
        return katex.renderToString(latexCode.value, { 
        throwOnError: false,
        displayMode: true, 
      });
      } catch {
        return "Invalid LaTeX syntax";
      }
    });

    const addLatex = (code) => {
      latexCode.value += code;
      updatePreview();
    };

    const getFractionFields = () => [
      { label: "Numerator: ", placeholder: "Enter numerator", value: "" },
      { label: "Denominator: ", placeholder: "Enter denominator", value: "" },
    ];

    const getSqrtFields = () => [
      { label: "Value: ", placeholder: "Enter value for square root", value: "" },
    ];

    const getRootFields = () => [
      { label: "Base: ", placeholder: "Enter base", value: ""},
      { label: "Root: ", placeholder: "Enter root", value: ""},
    ]

    const getExponentialFields = () => [
      { label: "Base: ", placeholder: "Enter base", value: ""},
      { label: "Exponential: ", placeholder: "Enter exponential", value: ""},
    ]

    const getIntegralFields = () => [
      { label: "Lower Bound: ", placeholder: "Enter lower bound (a)", value: "" },
      { label: "Upper Bound: ", placeholder: "Enter upper bound (b)", value: "" },
      { label: "Function: ", placeholder: "Enter function f(x)", value: "" },
      { label: "Variable: ", placeholder: "Enter variable (e.g., x)", value: "" },
    ];

    const getOIntegralFields = () => [
      { label: "Lower Bound: ", placeholder: "Enter lower bound (a)", value: "" },
      { label: "Upper Bound: ", placeholder: "Enter upper bound (b)", value: "" },
      { label: "Function: ", placeholder: "Enter function f(x)", value: "" },
      { label: "Variable: ", placeholder: "Enter variable (e.g., x)", value: "" },
    ];

    const getDerivativeFields = () => [
      { label: "Function: ", placeholder: "Enter function (f(x))", value: "" },
      { label: "Variable: ", placeholder: "Enter variable (e.g., x)", value: "" },
    ];

    const getPDerivativeFields = () => [
      { label: "Function: ", placeholder: "Enter function (f(x))", value: "" },
      { label: "Variable: ", placeholder: "Enter variable (e.g., x)", value: "" },
    ];

    const getSummaFields = () => [
      { label: "Lower Bound: ", placeholder: "Enter lower bound", value: "" },
      { label: "Upper Bound: ", placeholder: "Enter upper bound", value: "" },
      { label: "Function: ", placeholder: "Enter function f(x)", value: "" },      
    ]
    
    const getProductFields = () => [
      { label: "Lower Bound: ", placeholder: "Enter lower bound", value: "" },
      { label: "Upper Bound: ", placeholder: "Enter upper bound", value: "" },
      { label: "Function: ", placeholder: "Enter function f(x)", value: "" },      
    ]

    const getLimFields = () => [
      { label: "Variable approaching: ", placeholder: "Enter variable approaching", value: ""},
      { label: "Approachable variable: ", placeholder: "Enter approachable variable", value: ""},
      { label: "Function: ", placeholder: "Enter function", value: ""},
    ]


    const openFractionPopup = () => {
      popupTitle.value = "Add Fraction";
      popupFields.value = getFractionFields();
      showGenericPopup.value = true;
    };

    const openSqrtPopup = () => {
      popupTitle.value = "Add Square Root";
      popupFields.value = getSqrtFields();
      showGenericPopup.value = true;
    };

    const openRootPopup = () =>{
      popupTitle.value = "Add Root";
      popupFields.value = getRootFields();
      showGenericPopup.value = true;
    }

    const OpenExponentialPopup = () => {
      popupTitle.value = "Add Exponential";
      popupFields.value = getExponentialFields();
      showGenericPopup.value = true;
    }

    const openIntegralPopup = () => {
      popupTitle.value = "Add Integral";
      popupFields.value = getIntegralFields();
      showGenericPopup.value = true;
    };

    const openOIntegralPopup = () => {
      popupTitle.value = "Add OIntegral";
      popupFields.value = getOIntegralFields();
      showGenericPopup.value = true;
    };

    const openDerivativePopup = () => {
      popupTitle.value = "Add Derivative";
      popupFields.value = getDerivativeFields();
      showGenericPopup.value = true;
    };

    const openPDerivativePopup = () =>{
      popupTitle.value = "Add PDerivative";
      popupFields.value = getPDerivativeFields();
      showGenericPopup.value = true;
    }

    const openSummaPopup = () => {
      popupTitle.value = "Add Summa";
      popupFields.value = getSummaFields();
      showGenericPopup.value = true;
    }
    
    const openProductPopup = () => {
      popupTitle.value = "Add Product";
      popupFields.value = getProductFields();
      showGenericPopup.value = true;
    }

    const openLimPopup = () => {
      popupTitle.value = "Add Lim";
      popupFields.value = getLimFields();
      showGenericPopup.value = true;
    }

    const handlePopupSubmit = (values) => {
      if (!values || values.some(val => val === undefined || val === "")) {
       return; 
      }

      switch (popupTitle.value) {
        case "Add Fraction":
          latexCode.value += `\\frac{${values[0]}}{${values[1]}}`;
          break;
        case "Add Square Root":
          latexCode.value += `\\sqrt{${values[0]}}`;
          break;
        case "Add Root":
          latexCode.value += `\\sqrt[${values[1]}]{${values[0]}}`;
          break;
        case "Add Exponential":
          latexCode.value += `${values[0]}^{${values[1]}}`;
          break;
        case "Add Integral":
          latexCode.value += `\\int_{${values[0]}}^{${values[1]}} ${values[2]}\\, d${values[3]}`;
          break;
        case "Add OIntegral":
          latexCode.value += `\\oint_{${values[0]}}^{${values[1]}} ${values[2]}\\, d${values[3]}`;
          break;
        case "Add Derivative":
          latexCode.value += `\\frac{d}{d${values[1]}} ${values[0]}`;
          break;
        case "Add PDerivative":
          latexCode.value += `\\frac{\\partial}{\\partial ${values[1]}} ${values[0]}`;
          break;
        case "Add Summa":
          latexCode.value += `\\sum_{${values[0]}}^{${values[1]}} ${values[2]}`;
          break;
        case "Add Product":
          latexCode.value += `\\prod_{${values[0]}}^{${values[1]}} ${values[2]}`;
          break;
        case "Add Lim":
        latexCode.value += `\\lim_{${values[0]} \\to ${values[1]}} ${values[2]}`;
          break;
      }
      showGenericPopup.value = false;
      updatePreview();
    };

    const closePopup = () => {
      popupFields.value = [];
      showGenericPopup.value = false;
    }

    const clearEditor = () => {
      latexCode.value = "";
      renderedOutput.value = "";
      showGenericPopup.value = false;
    };

    return {
      latexCode,
      renderedOutput,
      showGenericPopup,
      popupTitle,
      popupFields,
      addLatex,
      buttonCategories,
      openFractionPopup,
      openSqrtPopup,
      openRootPopup,
      OpenExponentialPopup,
      openIntegralPopup,
      openOIntegralPopup,
      openDerivativePopup,
      openPDerivativePopup,
      openSummaPopup,
      openProductPopup,
      openLimPopup,
      handlePopupSubmit,
      clearEditor,
    };
  },
};
</script>

<style>
.editor-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  margin: auto;
}

.latex-input {
  width: 100%;
  height: 200px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.latex-output {
  border: 1px solid #ccc;
  padding: 20px;
  min-height: 100px;
  font-size: 18px;
  background: white;
  overflow-y: auto;
  border-radius: 5px;
}

.clear-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-button:hover {
  background-color: #e5533d;
}

</style>
