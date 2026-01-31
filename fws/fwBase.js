/**
 *
 * Download static source server
 *
 */
const INJECTED_SCRIPT_ID = "injectedScript";
let FW_ID_INCREASE = Date.now();
let COMPONENT_PAGE = null;
let INTERNAL_DOMAN = "";
if (DOMAN) {
  INTERNAL_DOMAN = DOMAN;
}

function fwWaitForElement(selector, timeout) {
  timeout = timeout || 5000;

  return new Promise(function (resolve, reject) {
    const start = Date.now();

    const timer = setInterval(function () {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(timer);
        reject("Timeout");
      }
    }, 50);
  });
}

/**
 * manual source import single file
 */
fwImport = (jsSource) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", INTERNAL_DOMAN + jsSource, true);

  const scriptId = [...jsSource]
    .map((c) => {
      if (c === "/" || c === ".") {
        return "_";
      } else {
        return c;
      }
    })
    .join("");

  xhr.onload = function () {
    if (xhr.status === 200) {
      const script = document.createElement("script");
      script.text = xhr.responseText;
      script.id = scriptId;
      document.getElementById(INJECTED_SCRIPT_ID).appendChild(script);
    }
  };

  xhr.onerror = function () {
    console.error("Network error");
  };

  xhr.send();

  fwWaitForElement(`#${scriptId}`).then(function () {
    console.log("Element ready:", `#${scriptId}`);
  });
};

/**
 * manual source import multiple file
 */
fwImports = (jsSources) => {
  if (!Array.isArray(jsSources) || jsSources.length === 0) return;

  let combinedCode = "";
  let index = 0;

  const scriptId = jsSources.join("_").replace(/[\/\.]/g, "_");

  const loadNext = () => {
    if (index >= jsSources.length) {
      // inject 1 script duy nhất
      const script = document.createElement("script");
      script.id = scriptId;
      script.text = combinedCode;
      document.getElementById(INJECTED_SCRIPT_ID).appendChild(script);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", INTERNAL_DOMAN + jsSources[index], true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        combinedCode += `\n/* ===== ${jsSources[index]} ===== */\n`;
        combinedCode += xhr.responseText;
        index++;
        loadNext(); // load script tiếp theo
      } else {
        console.error("Load failed:", jsSources[index]);
      }
    };

    xhr.onerror = function () {
      console.error("Network error:", jsSources[index]);
    };

    xhr.send();
  };

  loadNext();
};

/**
 *
 * @param {string} idHeader
 */
const fwGenerateId = (idHeader) => {
  return `${idHeader}_${FW_ID_INCREASE++}`;
};

const fwBoxVisible = (elementId) => {
  let box = document.getElementById(elementId);
  box.classList.remove("display-none");
};

const fwBoxInvisible = (elementId) => {
  let box = document.getElementById(elementId);
  if (!box.classList.contains("display-none")) {
    box.classList.add("display-none");
  }
};

const fwAddLongPress = (el, callback, delay = 500) => {
  let timer;

  el.addEventListener("pointerdown", () => {
    timer = setTimeout(callback, delay);
  });

  el.addEventListener("pointerup", () => clearTimeout(timer));
  el.addEventListener("pointercancel", () => clearTimeout(timer));
  el.addEventListener("pointermove", () => clearTimeout(timer));
}
