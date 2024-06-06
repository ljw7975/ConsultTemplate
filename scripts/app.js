const pronounForms = {
  he: {
    object: "him",
    possessive: "his",
    auxiliaryPast: "was",
    auxiliaryPresent: "is",
  },
  she: {
    object: "her",
    possessive: "her",
    auxiliaryPast: "was",
    auxiliaryPresent: "is",
  },
  they: {
    object: "them",
    possessive: "their",
    auxiliaryPast: "were",
    auxiliaryPresent: "are",
  },
  noInput: {
    object: "noInput",
    possessive: "noInput",
    auxiliaryPast: "noInput",
    auxiliaryPresent: "noInput",
  },
};

const form = document.querySelector("#myForm");
const progressBar = document.querySelector(".progress-bar");
const radioGroups = document.querySelectorAll(".form__radio-group");
const checkboxGroups = document.querySelectorAll(".form__checkbox-group");
const checkboxesShowsInput = document.querySelectorAll(
  "input[type='checkbox'].shows-input"
);
const additionalInputs = document.querySelectorAll(".additional-input");
const inputFields = document.querySelectorAll(
  ".form__text-input, .form__select-input, .form__textarea-input"
);
const lastStep = form.lastElementChild;
// const continueBtns = document.querySelectorAll(".continue-button");
// const backBtns = document.querySelectorAll(".back-button");
const formNavigationBtns = document.querySelectorAll("button[type='button']");
const submitBtn = document.querySelector("button[type='submit']");
const inputs = {};

// for radio buttons to hide/show additional input
radioGroups.forEach((group) => {
  group.addEventListener("change", (e) => {
    let current = e.target;
    // console.log(current);
    let additionalInput =
      current.parentElement.querySelector(".additional-input");
    if (additionalInput === null) {
      additionalInput =
        current.parentElement.parentElement.querySelector(".additional-input");
    }
    // console.log(additionalInput)
    let additionalInputs = group.querySelectorAll(".additional-input");

    if (current.type === "radio") {
      additionalInputs.forEach((input) => {
        clearInputField(input);
        hide(input);
      });

      if (current.classList.contains("shows-input")) {
        show(additionalInput);
      }
    }
  });
});

// for checkboxes to hide/show additional input
checkboxesShowsInput.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    let current = e.target;
    let additionalInput = current.parentElement.nextElementSibling;

    if (current.checked) {
      show(additionalInput);
    } else {
      hide(additionalInput);
    }
  });
});

document
  .querySelectorAll(".shows-input-intrusive")
  .forEach((intrusiveCheckbox) => {
    intrusiveCheckbox.addEventListener("change", (e) => {
      let intrusiveInput = document.querySelector(".intrusive-duration-input");
      let allIntrusiveCheckboxes = document.querySelectorAll(
        ".shows-input-intrusive"
      );
      // console.log(document.querySelector(".shows-input-intrusive").checked);
      let checkedBoxesCounter = 0;
      for (checkbox of allIntrusiveCheckboxes) {
        if (checkbox.checked) {
          checkedBoxesCounter += 1;
        }
      }
      if (checkedBoxesCounter > 0) {
        show(intrusiveInput);
      } else {
        hide(intrusiveInput);
      }
    });
  });

document
  .querySelector(".ocd-compulsion-input")
  .addEventListener("input", (e) => {
    let current = e.target;
    let compulsionReasonWrapper = document.querySelector(
      ".ocd-compulsion-reason-wrapper"
    );

    if (current.value !== "") {
      show(compulsionReasonWrapper);
    } else {
      hide(compulsionReasonWrapper);
    }
  });

// Hide element
function hide(element) {
  element.classList.add("hide");
}

// Show element
function show(element) {
  // console.log(element);
  element.classList.remove("hide");
}

// Clear input field
function clearInputField(element) {
  element.value = "";
}

// Capitalize first letter of string
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function initializeInputsObject() {
  const allInputs = document.querySelectorAll("input");

  allInputs.forEach((input) => {
    let name = input.name;
    inputs[name] = "noInput";
  });
}

// save checkbox values as array in inputs object
function saveCheckboxValues() {
  checkboxGroups.forEach((group) => {
    let name = group.querySelector("input").name;
    let checkedCheckboxes = group.querySelectorAll("input:checked");
    let additionalInputs = [];

    inputs[name] = [];
    checkedCheckboxes.forEach((checkbox) => {
      if (checkbox.classList.contains("shows-input")) {
        additionalInputs =
          checkbox.parentElement.querySelectorAll(".additional-input");

        if (additionalInputs.length === 0) {
          additionalInputs =
            checkbox.parentElement.parentElement.querySelectorAll(
              ".additional-input"
            );
        }
        for (let additionalInput of additionalInputs) {
          inputs[additionalInput.name] = additionalInput.value;
        }
      }
      // console.log(name);
      // console.log(inputs[name]);
      inputs[name].push(checkbox.value);
    });
  });
}

// // **** USE MAP OBJECT TO REDUCE RUNTIME
// function getDepressionSymptomsStr() {
// 	let userDepSymptomsStr = "";
// 	let userNotDepSymptomsStr = "";
// 	const allDepSymptoms = ["poor sleep", "feelings of guilt", "low energy", "low concentration", "an increase in appetite", "a decrease in appetite"];
// 	let userDepSymptoms = inputs["depSymptoms"];

// 	for (let i = 0; i < allDepSymptoms.length; i++) {
// 		if (userDepSymptoms.indexOf(allDepSymptoms[i]) !== -1) {
// 			if (i < allDepSymptoms.length - 1) {
// 				userDepSymptomsStr += allDepSymptoms[i] + ", ";
// 			}
// 			else {
// 				userDepSymptomsStr += allDepSymptoms[i];
// 			}
// 		}
// 	}

// 	for (let i = 0; i < allDepSymptoms.length; i++) {
// 		if (userDepSymptoms.indexOf(allDepSymptoms[i]) === -1) {
// 			if (i < userDepSymptoms.length - 1) {
// 				userNotDepSymptomsStr += allDepSymptoms[i] + ", ";
// 			}
// 			else {
// 				userNotDepSymptomsStr += allDepSymptoms[i];
// 			}
// 		}
// 	}

// 	return new Array(userDepSymptomsStr, userNotDepSymptomsStr);
// }

function capitalizeStr(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}

function formatAdditionalInput(additionalInputName) {
  let formattedAdditionallInputName = "";
  let words = additionalInputName.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (i === 0) {
      formattedAdditionallInputName += words[i];
    } else {
      formattedAdditionallInputName += capitalizeStr(words[i]);
    }
  }

  return formattedAdditionallInputName + "Input";
}

// USE MAPS HERE FOR LESS RUNTIME
function getDiagnosisStr(
  allSymptomsArr,
  userSymptomsKeyName,
  additionalInputExceptions,
  conjunctionWord
) {
  let userSymptomsStr = "";
  let userNotSymptomsStr = "";
  let userSymptoms = inputs[userSymptomsKeyName];

  for (let i = 0; i < allSymptomsArr.length; i++) {
    if (userSymptoms.indexOf(allSymptomsArr[i]) !== -1) {
      let additionalInputName = formatAdditionalInput(allSymptomsArr[i]);

      if (
        inputs[additionalInputName] &&
        additionalInputExceptions.indexOf(allSymptomsArr[i]) === -1
      ) {
        userSymptomsStr +=
          allSymptomsArr[i] + " (" + inputs[additionalInputName] + "), ";
      } else {
        userSymptomsStr += allSymptomsArr[i] + ", ";
      }
    }
  }

  for (let i = 0; i < allSymptomsArr.length; i++) {
    if (userSymptoms.indexOf(allSymptomsArr[i]) === -1) {
      // console.log("this Symptom is not in all syptoms");
      // console.log(allSymptomsArr[i]);
      userNotSymptomsStr += allSymptomsArr[i] + ", ";
    }
  }

  // replace last comma with either 'and' or 'or'
  if (conjunctionWord === "and") {
    userSymptomsStr = userSymptomsStr
      .substring(0, userSymptomsStr.lastIndexOf(","))
      .replace(/,(?=[^,]+$)/, ", and");
    userNotSymptomsStr = userNotSymptomsStr
      .substring(0, userNotSymptomsStr.lastIndexOf(","))
      .replace(/,(?=[^,]+$)/, ", and");
  } else if (conjunctionWord === "or") {
    userSymptomsStr = userSymptomsStr
      .substring(0, userSymptomsStr.lastIndexOf(","))
      .replace(/,(?=[^,]+$)/, " or");
    userNotSymptomsStr = userNotSymptomsStr
      .substring(0, userNotSymptomsStr.lastIndexOf(","))
      .replace(/,(?=[^,]+$)/, " or");
  } else {
    alert("invalid conjuction word");
  }

  return new Array(userSymptomsStr, userNotSymptomsStr);
}

const getImpressionStr = (symptomsArr) => {
  if (symptomsArr.length === 0) {
    return "none";
  } else if (symptomsArr.length === 1) {
    return symptomsArr.join(", ");
  } else {
    let last = symptomsArr.pop();
    return symptomsArr.join(", ") + " and " + last;
  }
};

// Save radio button values in inputs object
function saveRadioValues() {
  radioGroups.forEach((group) => {
    let name = group.querySelector("input").name;
    let checkedRadio = group.querySelector("input:checked");
    let additionalInput = null;

    if (checkedRadio !== null) {
      if (checkedRadio.classList.contains("shows-input")) {
        if (additionalInput !== null) {
          additionalInput =
            checkedRadio.parentElement.querySelector(".additional-input");
        } else {
          // console.log(checkedRadio.parentElement.parentElement);
          additionalInput =
            checkedRadio.parentElement.parentElement.querySelector(
              ".additional-input"
            );
        }

        // console.log(additionalInput.name);
        inputs[additionalInput.name] = additionalInput.value;
      }
      if (checkedRadio.value === "") {
        inputs[name] = "noInput";
      } else {
        inputs[name] = checkedRadio.value;
      }
    }
  });
}

// Save text/select/textarea values in inputs object
function saveInputValues() {
  inputFields.forEach((field) => {
    let inputElem = field.querySelector("input, select, textarea");
    let name = inputElem.name;
    let value = inputElem.value;

    if (value === "") {
      inputs[name] = "noInput";
    } else {
      inputs[name] = value;
    }
  });
}

// Update progress bar when navigating between form steps
function updateProgressBar(stepNum, buttonType) {
  let nextStepProgressBar = null;
  let currentStepProgressBar = document.querySelector(
    `.progress-bar__step.step-${stepNum}`
  );

  if (buttonType === "continue-button") {
    nextStepProgressBar = document.querySelector(
      `.progress-bar__step.step-${stepNum + 1}`
    );
  } else if (buttonType === "back-button") {
    nextStepProgressBar = document.querySelector(
      `.progress-bar__step.step-${stepNum - 1}`
    );
  } else {
    console.log("invalid stepnum for progress bar");
  }

  currentStepProgressBar.classList.remove("in-progress");
  currentStepProgressBar.classList.add("complete");
  nextStepProgressBar.classList.add("in-progress");
}

// console.log(inputs.obsessionEffectOption);

form.addEventListener("change", () => {
  let parentCheckbox = null;
  let childInputs = [];
  for (let additionalInput of additionalInputs) {
    console.log(additionalInput.previousElementSibling);
    parentCheckbox = additionalInput.previousElementSibling.querySelector(
      "input[type='checkbox']"
    );
    if (parentCheckbox) {
      if (parentCheckbox.checked) {
        console.log("parent checked");
        console.log(additionalInput.nodeName);
        if (additionalInput.nodeName === "INPUT") {
          additionalInput.setAttribute("required", "true");
        } else {
          childInputs = additionalInput.querySelectorAll("input");
          childInputs.forEach((childInput) => {
            childInput.setAttribute("required", "true");
          });
        }
      } else {
        if (additionalInput.nodeName === "INPUT") {
          additionalInput.removeAttribute("required");
        } else {
          childInputs = additionalInput.querySelectorAll("input");
          childInputs.forEach((childInput) => {
            childInput.removeAttribute("required", "true");
          });
        }
      }
    }
  }
});

// Save form values to inputs object and then generate text
function handleSubmit(event) {
  let isFormValid = form.checkValidity();
  // if (!isFormValid) {
  if (1 === 0) {
    alert("INVALID FORM");
  } else {
    event.preventDefault();

    show(document.querySelector(".generated-text"));

    hide(lastStep);
    hide(progressBar);

    initializeInputsObject();
    saveCheckboxValues();
    saveRadioValues();
    saveInputValues();

    console.log("inputs", inputs);
    const userInputOptions = {
      gender: {
        male: "male",
        female: "female",
        other: inputs.genderTextInput,
        noInput: `noInput`,
      },
      contactMethod: {
        inPerson: "in Person",
        telephone: "over the telephone",
        virtual: `virtually on video (on ${inputs.contactMethodTextInput})`,
        noInput: "noInput",
      },
      liveWith: {
        alone: "living alone",
        people: `with ${inputs.liveWithTextInput}`,
        noInput: `noInput`,
      },
      work: {
        works: `work/s as a ${inputs.workTextInput}`,
        odsp: "is supported by ODSP",
        lastWorked: `last worked as a ${inputs.workTextInput}`,
        noInput: `noInput`,
      },
      hasChildren: {
        yes: "has",
        no: "has no",
        noInput: `noInput`,
      },
      familyPhysician: {
        yes: `. You are ${
          pronounForms[inputs.pronoun].possessive
        } family physician`,
        no: ` and by Dr. ${inputs.familyPhysicianTextInput} (GP)`,
        noInput: `noInput`,
      },
      loss: {
        mood: `low mood`,
        hobbies: `loss of interest in hobbies`,
      },
      obsessionCompulsionEffect: {
        time: "are time consuming",
        functionalImpairment: `cause clinically significant functional impairment, causing, ${inputs.obsessionCompulsionFunctionalImpairmentInput}`,
      },
      traumaExposure: {
        experience: inputs.traumaExperienceOptionInput,
        witness: `witnessed ${inputs.traumaExperienceOptionInput}`,
        lovedOne: `learned that ${inputs.traumaExperienceOptionInput}`,
        repeatedly: `had repeated or extreme exposure to ${inputs.traumaExperienceOptionInput}`,
      },
      intrusionSymptom: {
        memories: "recurrent, involuntary, and intrusive distressing memories",
        dreams: "Recurrent distressing dream",
        flashbacks: "flashbacks",
        distress:
          "intense or prolonged psychological distress at exposure to internal or external cues that symbolize the event",
        reaction:
          "marked physiological reaction to internal or external cues that symbolize or resemble an aspect of traumatic event",
      },
      arousalReactivityChanges: {
        verbal:
          "irritable behaviour and angry outbursts expressed as verbal aggression",
        physical:
          "irritable behaviour and angry outbursts expressed as physical aggression",
        reckless: "reckless or self-destructive behaviour",
        hypervigilance: "hypervigilance",
        exaggerated: "exaggerated startle response",
        concentration: "problems with concentration",
        sleep: "sleep disturbance",
      },
      psychiatrist: {
        psychiatrist: `is followed by Dr.${inputs.psychiatrist}`,
        noInput: "is not followed by a psychiatrist",
      },
    };

    const allDepSymptoms = [
      "poor sleep",
      "feelings of guilt",
      "low energy",
      "low concentration",
      "an increase in appetite",
      "a decrease in appetite",
      "active suicidal thoughts",
      "passive suicidal thoughts",
    ];
    let userDepressionSymptomsStrArr = getDiagnosisStr(
      allDepSymptoms,
      "depSymptoms",
      ["active suicidal thoughts"],
      "and"
    );

    const allAnxietySymptoms = [
      "irritability",
      "restlessness",
      "muscle tension",
      "fatigue",
      "sleep disturbance",
      "poor concentration",
    ];
    let userAnxietySymptomsStrArr = getDiagnosisStr(
      allAnxietySymptoms,
      "anxietySymptoms",
      [],
      "and"
    );

    const allSpecifcPhobiaSymptoms = [
      "the situation almost always provokes fear",
      "functional impairment",
    ];
    let userSpecificPhobiaStrArr = getDiagnosisStr(
      allSpecifcPhobiaSymptoms,
      "specificPhobiaSymptoms",
      ["funtional impairment"],
      "and"
    );

    const allPanicAttacksSymptoms = [
      "palpitation",
      "sweating",
      "trembling",
      "shortness of breath",
      "choking",
      "chest pain",
      "nausea",
      "dizziness",
      "paresthesia",
      "derealization",
      "fear of losing control",
      "fear of dying",
    ];
    let userPanicAttacksStrArr = getDiagnosisStr(
      allPanicAttacksSymptoms,
      "panicAttacksSymptom",
      [],
      "and"
    );

    const allAgoraphobiaSymptoms = [
      "public transportation",
      "being in open spaces",
      "enclosed spaces",
      "being in a crowd",
      "being in a line",
      "being outside the home alone",
    ];
    let userAgoraphobiaStrArr = getDiagnosisStr(
      allAgoraphobiaSymptoms,
      "agoraphobiaSymptoms",
      [],
      "and"
    );

    const criterionOCDSymptoms = ["persistent thoughts", "urges", "images"];
    let userCriterionOCDSymptoms = getDiagnosisStr(
      criterionOCDSymptoms,
      "criterionOCDSymptoms",
      [],
      "and"
    );

    const compulsionReasons = ["reduce distress", "prevent"];
    let userCompulsionReasons = getDiagnosisStr(
      compulsionReasons,
      "compulsionReason",
      [],
      "or"
    );

    const avoidanceSymptoms = [
      "memories",
      "thoughts",
      "feelings",
      "external reminders",
    ];
    let userAvoidanceSymptoms = getDiagnosisStr(
      avoidanceSymptoms,
      "ptsdAvoidanceSymptoms",
      [],
      "or"
    );

    const negativeChanges = [
      "inability to remember an important aspect of the traumatic events",
      "persistent and exaggerated negative beliefs or expectations about oneself/others/the world",
      "persistent and distorted cognitions about the cause or consequences of the traumatic event(s) that lead the individual to blame himself/herself or others",
      "persistent negative emotional state",
      "markedly diminished interest or participation in significant activities",
      "feelings of detachment or estrangement from others",
      "persistent inability to experience positive emotions",
    ];
    let userNegativeChanges = getDiagnosisStr(
      negativeChanges,
      "ptsdNegativeChanges",
      [],
      "and"
    );

    const someBPDSymptoms = [
      "frantic efforts to avoid real or imagined abandonment",
      "identity disturbance: markedly and persistently unstable self-image or sense of self",
      "chronic feelings of emptiness",
    ];
    let someUserBPDSymptoms = getDiagnosisStr(
      someBPDSymptoms,
      "bpdSymptom",
      [],
      "and"
    );

    const bpdImpulsivitySymptoms = [
      "spending",
      "sex",
      "substance abuse",
      "reckless driving",
      "binge eating",
    ];
    let userBPDImpulsivitySymptoms = getDiagnosisStr(
      bpdImpulsivitySymptoms,
      "impulsivitySymptom",
      [],
      "and"
    );

    // const impressionBioSymptoms = ["", "sex", "substance abuse", "reckless driving", "binge eating"];
    // let userBPDImpulsivitySymptoms = getDiagnosisStr(bpdImpulsivitySymptoms, "impulsivitySymptom", [], "and");

    const sentenceOptions = {
      suicidalThoughts: document.querySelector(".active-suicidal-thoughts")
        .checked
        ? `Specifically, ${inputs.firstName} states that ${inputs.pronoun} will ${inputs.activeSuicidalThoughtsInput}.`
        : document.querySelector(".passive-suicidal-thoughts").checked
        ? `${inputs.pronoun} endorses passive suicide thoughts without specific plans.`
        : "",
      homicidalThoughts: document.querySelector(".homicidal").checked
        ? `endorses homicidal ideation or other aggressive behaviour, specifically to ${inputs.homicidalThoughtsInput}.`
        : "denies homicidal ideation or other aggressive behaviour.",
      anxietyFunctionalImpairment: document.querySelector(
        ".anxiety-functional-impairment"
      ).checked
        ? `The anxiety causes functional impairment, affecting ${inputs.anxietyFunctionalImpairmentInput}.`
        : "",
      provokesFear: document.querySelector(".provokes-fear").checked
        ? `${inputs.pronoun} states this situation almost always provokes fear and ${inputs.provokesFearOption}.`
        : `${inputs.pronoun} denies this situation almost always provokes fear.`,
      phobiaFunctionalImpairment: document.querySelector(
        ".phobia-functional-impairment"
      ).checked
        ? `This fear causes functional impairment, interfering with ${inputs.phobiaFunctionalImpairmentInput}.`
        : "",
      socialAnxietyAround: document.querySelector(".social-anxiety-around")
        .checked
        ? `${inputs.firstName} endorses fear around ${inputs.socialAnxietyAroundOption} which will be negatively evaluated`
        : `${inputs.firstName} denies endorsing fear which will be negatively evaluated`,
      socialAnxietySituations: document.querySelector(
        ".social-anxiety-situations"
      ).checked
        ? `These social situations almost always provoke anxiety and are ${inputs.socialAnxietySituationsOption}`
        : `${inputs.firstName} denies social situations almost always provoking anxiety`,
      socialAnxietyProportion: document.querySelector(
        ".social-anxiety-proportion"
      ).checked
        ? "The anxiety is out of proportion to the actual threat posed"
        : "The anxiety is not out of proportion to the actual threat posed",
      socialAnxietyFunctionalImpairment: document.querySelector(
        ".social-anxiety-functional-impairment"
      ).checked
        ? `and is functionally impairing, causing ${inputs.socialAnxietyFunctionalImpairmentInput}`
        : "and is not functionally impairing",
      ocdIgnore: document.querySelector(".ocd-ignore").checked
        ? `${inputs.firstName} attempts to ignore or neutralize thoughts/urges/images.`
        : "",
      ocdCompulsion:
        document.querySelector(".ocd-compulsion-input").value !== ""
          ? `${inputs.firstName} complains of repetitively ${inputs.ocdCompulsion} in response to the obsession in an attempt to ${userCompulsionReasons[0]}.`
          : "",
      ocdCompulsionEffect: document.querySelector(
        "#obsession-compulsion-effect"
      ).checked
        ? `The obsessions/compulsions ${
            userInputOptions.obsessionCompulsionEffect[
              inputs.obsessionEffectOption
            ]
          }.`
        : "",
      ptsdTraumaExposure: document.querySelector("#trauma-exposure").checked
        ? `${inputs.firstName} endorses having ${
            userInputOptions.traumaExposure[inputs.traumaExperienceOption]
          }.`
        : "",
      ptsdIntrusionSymptoms: document.querySelector("#intrusion-symptoms")
        .checked
        ? `This is accompanied by ${
            userInputOptions.intrusionSymptom[inputs.intrusionSymptomOption]
          }.`
        : "",
      ptsdAvoidanceSymptoms: document.querySelector("#avoidance-symptoms")
        .checked
        ? `${inputs.firstName} complains of persistent avoidance to avoid distressing ${userAvoidanceSymptoms[0]} that arouse disressing memories, thoughts, or feelings.`
        : "",
      ptsdNegativeChanges: document.querySelector("#negative-changes").checked
        ? `This is accompanied by: ${userNegativeChanges[0]}.`
        : "",
      ptsdArousalReactivityChanges: document.querySelector(
        "#arousal-reactivity-changes"
      ).checked
        ? `This is accompanied by ${
            userInputOptions.arousalReactivityChanges[
              inputs.ptsdArousalReactivityChangeOption
            ]
          }.`
        : "",
      bpdInstability: document.querySelector("#instability").checked
        ? `${
            inputs.firstName
          } complains of a long-standing history of affective instability due to a marked reactivity of mood, stating that ${
            pronounForms[inputs.pronoun].possessive
          } mood fluctuates multiple times in ${
            inputs.instabilityDurationInput
          }.`
        : `${inputs.firstName} denies any history of affective instability due to a marked reactivity of mood.`,
      someBPDSymptoms:
        someUserBPDSymptoms[1] === ""
          ? `${inputs.firstName} also complains of ${someUserBPDSymptoms[0]}.`
          : someUserBPDSymptoms[0] === ""
          ? `${inputs.firstName} denies any history of ${someUserBPDSymptoms[1]}.`
          : `${inputs.firstName} also complains of ${someUserBPDSymptoms[0]}. ${inputs.firstName} denies any history of ${someUserBPDSymptoms[1]}.`,
      bpdRelationships: document.querySelector("#bpd-relationships").checked
        ? `${inputs.firstName} endorses a pattern of unstable and intense interpersonal relationships characterized by alternating between extremes of idealization and devaluation.`
        : `${inputs.firstName} denies any history of a pattern of unstable and intense interpersonal relationships characterized by alternating between extremes of idealization and devaluation.`,
      bpdImpulsivity:
        document.querySelector("#bpd-impulsivity").checked === false
          ? `${inputs.firstName} denies any history of impulsivity.`
          : userBPDImpulsivitySymptoms[1] === ""
          ? `${inputs.firstName} also endorses impulsivity in ${userBPDImpulsivitySymptoms[0]}.`
          : `${inputs.firstName} also endorses impulsivity in ${userBPDImpulsivitySymptoms[0]}. ${inputs.firstName} denies any history of impulsivity in ${userBPDImpulsivitySymptoms[1]}.`,
      bpdAnger: document.querySelector("#bpd-anger").checked
        ? `${inputs.firstName} struggles with controlling ${
            pronounForms[inputs.pronoun].possessive
          } anger, leading to ${inputs.angerConsequencesInput}`
        : `${inputs.firstName} denies struggling with controlling ${
            pronounForms[inputs.pronoun].possessive
          } anger`,
      bpdParanoid: document.querySelector("#bpd-paranoid").checked
        ? `${inputs.firstName} complains of stress-related paranoid ideation or severe dissociative symptoms.`
        : `${inputs.firstName} denies any history of stress-related paranoid ideation of severe dissociative symptoms.`,
      maniaPersistentElevatedMood: document.querySelector("#mania-elevatedMood")
        .checked
        ? `${inputs.firstName} is having persistently eleavated mood for ${
            document.querySelector(".persistentlyElevatedMoodDuration").value
          }.`
        : `${inputs.firstName} is not having persistently elevated mood`,
      maniaPersistantlyIrritableMood: document.querySelector(
        "#mania-irritableMood"
      ).checked
        ? `${inputs.firstName} has persistently irritable mood for ${
            document.querySelector(".persistently-irritable-mood").value
          }.`
        : `${inputs.firstName} is not having persistently irritable mood`,
      maniaInflatedSelfEsteem: document.querySelector(
        "#mania-inflatedSelfEsteem "
      ).checked
        ? `${inputs.firstName} is experiencing inflated self esteem.`
        : `${inputs.firstName} denies inflated self esteem.`,
      maniaGrandiosity: document.querySelector("#mania-grandiosity").checked
        ? `${inputs.firstName} is experiencing grandiosity.`
        : `${inputs.firstName} denies gradiosity.`,
      maniaNeedForSleep: document.querySelector("#mania-needForSleep").checked
        ? `${inputs.firstName} decreases need for sleep.`
        : `${inputs.firstName} denies decrease need for sleep.`,
      maniaTalkativeness: document.querySelector("#mania-talkativeness").checked
        ? `${inputs.firstName} is talkativeness.`
        : `${inputs.firstName} denies manic talkativeness.`,
      maniaFlightOfIdeas: document.querySelector("#mania-flightOfIdeas").checked
        ? `${inputs.firstName} is experiencing flight of ideas.`
        : `${inputs.firstName} denies flight of ideas.`,
      maniaDistractibility: document.querySelector("#mania-distractibility")
        .checked
        ? `${inputs.firstName} distractibility.`
        : `${inputs.firstName} denies distractaibility.`,
      maniaIncGoalDirected: document.querySelector("#mania-incGoalDirected")
        .checked
        ? `${inputs.firstName} increased goal-directed activity.`
        : `${inputs.firstName} denies increased goal-directed activity.`,
      psychosisVisualHallucination: document.querySelector("#psychosis-visual")
        .checked
        ? `${inputs.firstName} is having visual halluciantion of ${
            document.querySelector(".psychosis_visual").value
          }`
        : `${inputs.firstName} denies having visual hallucination`,
      psychosisAuditoryHallucination: document.querySelector(
        "#psychosis-auditory"
      ).checked
        ? document.querySelector("#psychosis-auditory-command")
          ? document.querySelector("#psychosis-auditory-duration")
            ? `${inputs.firstName} is experiencing auditory halluciations of ${
                document.querySelector(".psychosis_auditory_command").value
              } for ${
                document.querySelector(".psychosis_auditory_duration").value
              }`
            : `${inputs.firstName} is experiencing auditory halluciations of ${
                document.querySelector(".psychosis_auditory_command").value
              }`
          : `is experiencing auditory hallucination`
        : "is not experiencing auditory hallucination",
    };

    /*
		Object literal containing the paragraphs including the diagnosis of an illness,
		JavaScript ternary operators are used to check for conditions such as: 
			- criteron A is not met (specific symptoms are not selected)
			- no symptoms are selected
			- all symptoms are selected
			- some symptoms are selected
			- specific edge cases for an illness
		*/

    const hpiParagraphOptions = {
      depression:
        inputs.depSymptoms.length === 0
          ? `<p>${inputs.firstName} denies any history of low mood, loss of interest in hobbies, poor sleep, feelings of guilt, low energy, low concentration, an increase/decrease in appetite, suicidal thoughts, and homicidal thoughts.</p>`
          : userDepressionSymptomsStrArr[1] === ""
          ? `<p>${inputs.firstName} presents with a ${
              inputs.lossOptionInput
            } history of ${
              userInputOptions.loss[inputs.lossOption]
            } accompanied by 
					${userDepressionSymptomsStrArr[0]}. ${sentenceOptions.suicidalThoughts} ${
              inputs.firstName
            } ${sentenceOptions.homicidalThoughts}
					</p>`
          : `<p>${inputs.firstName} presents with a ${
              inputs.lossOptionInput
            } history of ${
              userInputOptions.loss[inputs.lossOption]
            } accompanied by ${userDepressionSymptomsStrArr[0]}. 
					${inputs.firstName} denies any history of ${userDepressionSymptomsStrArr[1]}. ${
              sentenceOptions.suicidalThoughts
            } ${inputs.firstName} ${sentenceOptions.homicidalThoughts}
					</p>`,

      // Jaewon
      generalizedAnxietyDisorder:
        document.querySelector(".anxiety-worry").value === ""
          ? `<p>${inputs.firstName} denies any history of an anxiety which is difficult to control.</p>`
          : userAnxietySymptomsStrArr[1] === ""
          ? `<p>${inputs.firstName} presents with a ${
              document.querySelector(".anxiety-duration").value
            } history of anxiety which is difficult to control. Specifically, ${
              inputs.firstName
            } worries about ${
              document.querySelector(".anxiety-worry").value
            }. This is
						accompanied by ${userAnxietySymptomsStrArr[0]}. ${
              sentenceOptions.anxietyFunctionalImpairment
            }
						</p>`
          : `<p>${inputs.firstName} presents with a ${
              document.querySelector(".anxiety-duration").value
            } history of anxiety which is difficult to control. Specifically, ${
              inputs.firstName
            } worries about ${
              document.querySelector(".anxiety-worry").value
            }. This is
						accompanied by ${userAnxietySymptomsStrArr[0]}. ${
              inputs.firstName
            } denies any history of ${userAnxietySymptomsStrArr[1]}. ${
              sentenceOptions.anxietyFunctionalImpairment
            }
						</p>`,

      specificPhobia:
        document.querySelector(".specific-phobia-input").value === ""
          ? `<p>${inputs.firstName} denies any history of fear over a phobia.</p>`
          : inputs.specificPhobiaSymptoms.length === 0
          ? `<p>${inputs.firstName} denies any history of fear over a phobia.</p>`
          : `<p>${inputs.firstName} complains of a ${inputs.specificPhobiaDuration} history of fear over 
						${inputs.specificPhobiaInput}. ${sentenceOptions.provokesFear} ${sentenceOptions.phobiaFunctionalImpairment}
						</p>`,

      socialAnxietyDisorder:
        document.querySelector(".anxiety-scrutiny-duration").value === ""
          ? `<p>${inputs.firstName} denies history of anxiety in social situation(s) where is ${inputs.firstName} is afraid of possible scrutiny by others.</p>`
          : `<p>${inputs.firstName} endorses a ${inputs.anxietyScrutinyDuration} history of anxiety in social situation(s) where ${inputs.firstName} is afraid of possible scrutiny by others,
						namely (). ${sentenceOptions.socialAnxietyAround}. ${sentenceOptions.socialAnxietySituations}. ${sentenceOptions.socialAnxietyProportion} ${sentenceOptions.socialAnxietyFunctionalImpairment}.</p>`,

      panicAttacks:
        document.querySelector(".panic-attacks-duration").value === ""
          ? `<p>${inputs.firstName} denies any history of panic attacks.</p>`
          : userPanicAttacksStrArr[0] === ""
          ? `<p>${inputs.firstName} endorses a ${inputs.panicAttacksDuration} history of panic attacks, marked by an intense fear peaking within minutes. 
						${inputs.firstName} denies any history of ${userPanicAttacksStrArr[1]}.</p>`
          : userPanicAttacksStrArr[1] === ""
          ? `<p>${inputs.firstName} endorses a ${inputs.panicAttacksDuration} history of panic attacks, marked by an intense fear peaking within minutes,
						accompanied by ${userPanicAttacksStrArr[0]}.</p>`
          : `<p>${inputs.firstName} endorses a ${inputs.panicAttacksDuration} history of panic attacks, marked by an intense fear peaking within minutes, accompanied by ${userPanicAttacksStrArr[0]}. 
						${inputs.firstName} denies any history of ${userPanicAttacksStrArr[1]}.
						</p>`,

      agoraphobia:
        userAgoraphobiaStrArr[1] === ""
          ? `<p>${inputs.firstName} endorses anxiety about ${userAgoraphobiaStrArr[0]}.</p>`
          : userAgoraphobiaStrArr[0] === ""
          ? `<p>${inputs.firstName} denies anxiety about ${userAgoraphobiaStrArr[1]}.</p>`
          : `<p>${inputs.firstName} endorses anxiety about ${userAgoraphobiaStrArr[0]}. ${inputs.firstName} denies anxiety about ${userAgoraphobiaStrArr[1]}.</p>`,

      ocd:
        document.querySelector(".shows-input-intrusive").checked === false
          ? `<p>${inputs.firstName} denies any history of instrusive persistent thoughts, urges, and images.</p>`
          : `<p>${inputs.firstName} endorses a ${inputs.intrusiveDurationInput} history of intrusive ${userCriterionOCDSymptoms[0]}. ${sentenceOptions.ocdIgnore} ${sentenceOptions.ocdCompulsion} ${sentenceOptions.ocdCompulsionEffect}</p>`,

      // add condition for if criterion a is not met
      ptsd:
        document.querySelector("#trauma-exposure").checked === false
          ? `<p>${inputs.firstName} denies any history of trauma.</p>`
          : `<p>${sentenceOptions.ptsdTraumaExposure} ${sentenceOptions.ptsdIntrusionSymptoms} ${sentenceOptions.ptsdNegativeChanges} ${sentenceOptions.ptsdArousalReactivityChanges}</p>`,

      borderlinePersonalityDisorder: `<p>${sentenceOptions.bpdInstability} ${sentenceOptions.someBPDSymptoms} ${sentenceOptions.bpdRelationships} ${sentenceOptions.bpdImpulsivity} ${sentenceOptions.bpdImpulsivity} ${sentenceOptions.bpdAnger} ${sentenceOptions.bpdParanoid}</p>`,
      mania: `<p>${inputs.firstName} has ${sentenceOptions.maniaPersistentElevatedMood} ${sentenceOptions.maniaPersistantlyIrritableMood} ${sentenceOptions.maniaInflatedSelfEsteem} ${sentenceOptions.maniaGrandiosity} ${sentenceOptions.maniaNeedForSleep} ${sentenceOptions.maniaTalkativeness} ${sentenceOptions.maniaFlightOfIdeas} ${sentenceOptions.maniaDistractibility} ${sentenceOptions.maniaIncGoalDirected}</p>`,
      psychosis: `<p>${sentenceOptions.psychosisAuditoryHallucination} ${sentenceOptions.psychosisVisualHallucination}</p>`,
    };

    document.querySelector(".generated-text").innerHTML = `
			<p>Dear Dr. ${inputs.referringDoctor},</p>

			<p>Thank you for referring ${
        inputs.firstName
      }, who was seen in assessment by myself, Dr. Charles Choi, PGY3 resident, and Dr. ${
      inputs.supervisor
    }, staff psychiatrist, from ${inputs.startTime} to ${inputs.endTime} on ${
      inputs.date
    }, 
    ${
      //Jaewon previously: virtually over video (on WebEx)
      userInputOptions.contactMethod[inputs.contactMethod]
    }. You referred ${
      pronounForms[inputs.pronoun].object
    } for a psychiatric consultation, including for diagnostic clarification and treatment recommendations.</p>

			<p>Informed verbal consent was obtained from ${
        pronounForms[inputs.pronoun].object
      } to communicate and provide care using virtual and other telecommunications tools. The potential risks related to unauthorized disclosure or interception of personal health information and steps they can take to help protect ${
      pronounForms[inputs.pronoun].possessive
    } information were explained. We have discussed that care provided through video or audio communication cannot always replace the need for physical examination or an in person visit for some disorders or urgent problems and ${
      inputs.pronoun
    } understand/s the need to seek urgent care in an Emergency Department as necessary.</p>

			<p>Confidentiality within ${
        pronounForms[inputs.pronoun].possessive
      } circle of care, and its limitations, including potential concerns for the safety of the patient, other people, children, and driving safety were discussed.</p>

			<p>Prior to the appointment, we verified ${
        pronounForms[inputs.pronoun].possessive
      } ID by examining ${
      pronounForms[inputs.pronoun].possessive
    } health card. We also confirmed that ${inputs.pronoun} ${
      pronounForms[inputs.pronoun].auxiliaryPast
    } calling in from within Ontario, and ${inputs.pronoun} ${
      pronounForms[inputs.pronoun].auxiliaryPast
    } seen from ${inputs.address}. ${capitalize(
      pronounForms[inputs.pronoun].possessive
    )} cell phone number is ${inputs.phone}.</p>

			<h4>ID:</h4>
			<p>${inputs.firstName} (${inputs.pronoun}/${
      pronounForms[inputs.pronoun].object
    }) is a ${inputs.maritalStatus} ${
      userInputOptions.gender[inputs.gender]
    } living in ${inputs.city} ${
      userInputOptions.liveWith[inputs.liveWith]
    }. ${capitalize(inputs.pronoun)} ${userInputOptions.work[inputs.work]}. ${
      inputs.firstName
    } ${userInputOptions.hasChildren[inputs.hasChildren]} children and ${
      inputs.drives
    } drive. ${capitalize(inputs.pronoun)} ${
      pronounForms[inputs.pronoun].auxiliaryPresent
    }  
    ${
      inputs.psychiatrist == "noInput"
        ? "not followed by a psychiatrist"
        : `followed by Dr.${inputs.psychiatrist}`
    }
    ${userInputOptions.familyPhysician[inputs.familyPhysician]}. ${capitalize(
      inputs.pronoun
    )} ${
      inputs.pronoun == "they" ? "self-report" : "self-reports"
    } historical diagnoses of ${inputs.diagnoses}.
			</p>

			<h4>RFR:</h4>
			<p>${inputs.reasonForReferral}</p>

			<h4>CC:</h4>
			<p>${inputs.chiefComplaint}</p>

			<h4>HPI:</h4>
			${hpiParagraphOptions.depression}
			${hpiParagraphOptions.generalizedAnxietyDisorder}
			${hpiParagraphOptions.specificPhobia}
			${hpiParagraphOptions.socialAnxietyDisorder}
			${hpiParagraphOptions.panicAttacks}
			${hpiParagraphOptions.agoraphobia}
			${hpiParagraphOptions.ocd}
			${hpiParagraphOptions.ptsd}
			${hpiParagraphOptions.borderlinePersonalityDisorder}
      ${hpiParagraphOptions.mania}
      ${hpiParagraphOptions.psychosis}
			<p></p>

			<h4>IMPRESSION:</h4>

			<p>${capitalize(inputs.firstName)} is a ${inputs.age} year old ${
      inputs.gender
    } presenting with ${inputs.impressionPresenting}</p>
      <p>
      ${capitalize(inputs.firstName)} is feeling ${inputs.impressionComment}
      </p>
		`;
    // Jaewon - put this one line above inside ` to put it back
    // 	<p>${
    //     pronounForms[inputs.pronoun].possessive
    //   } presentation could be understood from a biopsychosocial model:</p>
    // 	<p>Predisposing: ${getImpressionStr(
    //     new Array(
    //       ...inputs.predisposingBio,
    //       ...inputs.predisposingPsy,
    //       ...inputs.predisposingSocial
    //     )
    //   )}</p>
    // 	<p>Precipitating: ${getImpressionStr(
    //     new Array(
    //       ...inputs.precipitatingBio,
    //       ...inputs.precipitatingPsy,
    //       ...inputs.precipitatingSocial
    //     )
    //   )}</p>
    // 	<p>Perpetuating: ${getImpressionStr(
    //     new Array(...inputs.perpetuatingBio, ...inputs.perpetuatingPsy)
    //   )}</p>
    // 	<p>Protective: ${getImpressionStr(
    //     new Array(
    //       ...inputs.protectiveBio,
    //       ...inputs.protectivePsy,
    //       ...inputs.protectiveSocial
    //     )
    //   )}</p>
  }
}

// Navigate between form steps
function handleFormButton(stepNum, buttonType) {
  let currentStepDisplay = document.querySelector(
    `.form__step.step-${stepNum}`
  );
  let nextStepDisplay = null;

  if (buttonType === "continue-button") {
    // console.log("going to next step");
    nextStepDisplay = document.querySelector(`.form__step.step-${stepNum + 1}`);
  } else if (buttonType === "back-button") {
    // console.log("going back a step");
    nextStepDisplay = document.querySelector(`.form__step.step-${stepNum - 1}`);
  } else {
    console.log("invalid button type");
  }

  hide(currentStepDisplay);
  show(nextStepDisplay);

  updateProgressBar(stepNum, buttonType);
}

// Continue to next/previous step on button click
formNavigationBtns.forEach((formBtn) => {
  formBtn.addEventListener("click", () => {
    const currStep = formBtn.value;
    let buttonType = formBtn.className;
    // console.log(buttonType);

    if (parseInt(currStep) == 1) {
      let isFormValid = form.checkValidity();
      console.log("isvalid", isFormValid);
      let hiddenText = document.getElementById("step1-hidden");
      if (isFormValid) {
        hiddenText.hidden = true;
        handleFormButton(parseInt(currStep), buttonType);
      } else {
        hiddenText.hidden = false;
      }
    } else {
      handleFormButton(parseInt(currStep), buttonType);
    }
  });
});

// Submit form on button click
submitBtn.addEventListener("click", handleSubmit);

// Reset form on page load/refresh
window.addEventListener("DOMContentLoaded", form.reset());

// function updateTextRealtime(e) {
// 	let inputElemIDName = e.getAttribute("id");
// 	let inputElem = document.getElementById(inputElemIDName);
// 	let displayElemArr = document.getElementsByClassName(
// 		inputElemIDName.slice(0, -6)
// 	);

// 	for (let elem of displayElemArr) {
// 		// console.log(e.name);
// 		if (e.name === "liveWithTextInput") {
// 			elem.innerText = "with " + inputElem.value;
// 		} else if (e.name === "workTextInput") {
// 			elem.innerText = "work/s as a " + inputElem.value;
// 		} else if (e.name === "gpTextInput") {
// 			elem.innerText = ` and by Dr. ${inputElem.value} (GP)`;
// 		} else {
// 			elem.innerText = inputElem.value;
// 		}
// 	}
// }

// function updateButtonRealtime(e) {
// 	let radioButtons = document.getElementsByName(e.name);
// 	let displayElemArr = document.getElementsByClassName(e.name);

// 	const pronounForms = {
// 		he: { object: "him", possessive: "his" },
// 		she: { object: "her", possessive: "her" },
// 		they: { object: "them", possessive: "their" },
// 	};

// 	const options = {
// 		hasChildren: {
// 			yes: "has",
// 			no: "has no",
// 		},
// 		gp: {
// 			yes: `. You are their family physician`,
// 		},
// 	};

// 	for (let radio of radioButtons) {
// 		if (radio.checked) {
// 			for (let elem of displayElemArr) {
// 				// console.log(e.name);
// 				if (e.name === "hasChildren") {
// 					// console.log(options.hasChildren[radio.value]);
// 					elem.innerText = options.hasChildren[radio.value];
// 				} else if (e.name === "gp") {
// 					elem.innerText = options.gp[radio.value];
// 				} else {
// 					elem.innerText = radio.value;
// 				}
// 			}
// 		}
// 	}
// }

// function showDepressionSymptoms(e) {
// 	let checkBox = document.getElementById("depression_checkbox");
// 	let symptomsContainer = document.getElementById("depression_symptoms");

// 	if (checkBox.checked == true) {
// 		symptomsContainer.style.display = "block";
// 	} else {
// 		symptomsContainer.style.display = "none";
// 	}
// }

// function updateDepressionSymptomsRealtime(e) {
// 	let fname = document.getElementById("fname_input").value;
// 	// console.log(fname);

// 	let depression_symptoms_display_elem = document.getElementById(
// 		"depression_symptoms_display"
// 	);

// 	let depression_symptoms_checkboxes_container = document.getElementById(
// 		"depression_symptoms"
// 	);
// 	let depression_symptoms_checkboxes =
// 		depression_symptoms_checkboxes_container.querySelectorAll("input");

// 	let symptomsArr = [];
// 	let deniedSymptomsArr = [];

// 	// console.log(depression_symptoms_checkboxes);
// 	depression_symptoms_checkboxes.forEach((symptom_checkbox) => {
// 		if (symptom_checkbox.checked) {
// 			symptomsArr.push(symptom_checkbox.value);
// 		} else {
// 			deniedSymptomsArr.push(symptom_checkbox.value);
// 		}
// 	});

// 	let symptomsStr = "";

// 	for (let i = 0; i < symptomsArr.length; i++) {
// 		if (symptomsArr[i] !== "") {
// 			if (symptomsArr.length - 1 === i && symptomsArr.length > 1) {
// 				if (symptomsArr[i] === "accompanied by poor sleep") {
// 					symptomsStr =
// 						symptomsStr +
// 						`<span>${
// 							"and " + symptomsArr[i] + "."
// 						}</span> <span class="duration" contenteditable="">[Enter Duration]</span>, `;
// 				} else if (symptomsArr[i] === "active suicidal thoughts") {
// 					symptomsStr =
// 						symptomsStr +
// 						`<span>${
// 							"and " + symptomsArr[i] + "."
// 						}</span> <span class="duration" contenteditable="">[Enter Duration]</span>, `;
// 				} else {
// 					symptomsStr =
// 						symptomsStr +
// 						`<span>${
// 							"and " + symptomsArr[i] + "."
// 						}</span>. Specifically, ${fname} states that {pronoun}`;
// 				}
// 			} else {
// 				if (symptomsArr[i] === "accompanied by poor sleep") {
// 					symptomsStr =
// 						symptomsStr +
// 						`<span>${symptomsArr[i]}</span> <span class="duration" contenteditable="">[Enter Duration]</span>, `;
// 				} else {
// 					symptomsStr =
// 						symptomsStr + `<span>${symptomsArr[i] + ", "}</span>`;
// 				}
// 			}
// 		}
// 	}
// 	depression_symptoms_display_elem.innerHTML = symptomsStr;

// 	let deniedSymptomsStr = "";
// 	// console.log(deniedSymptomsArr.length);

// 	for (let i = 0; i < deniedSymptomsArr.length; i++) {
// 		if (deniedSymptomsArr[i] !== "") {
// 			if (deniedSymptomsArr.length - 1 === i) {
// 				deniedSymptomsStr =
// 					deniedSymptomsStr +
// 					`<span>${"and " + deniedSymptomsArr[i] + "."}</span>`;
// 			} else {
// 				deniedSymptomsStr =
// 					deniedSymptomsStr +
// 					`<span>${deniedSymptomsArr[i] + ", "}</span>`;
// 			}
// 		}
// 	}

// 	if (deniedSymptomsArr !== "") {
// 		depression_symptoms_display_elem.innerHTML +=
// 			`<span> ${fname + " denies any history of "}</span>` +
// 			deniedSymptomsStr;
// 	}
// }

function showRadioOptions(e) {
  let checkboxID = e.getAttribute("id");
  let checkbox = document.getElementById(checkboxID);
  let options = document.getElementById(
    `${checkboxID.split("-")[0] + "-options"}`
  );
  // console.log(options);

  if (checkbox.checked == true) {
    options.style.display = "block";
  } else {
    options.style.display = "none";
  }
}

// function saveToPDF() {
// 	const doc = new jsPDF();
// 	let consult_text = document.querySelector("generated-text").innerText;

// 	doc.text(consult_text, 10, 10);
// 	doc.save("consult.pdf");
// }
