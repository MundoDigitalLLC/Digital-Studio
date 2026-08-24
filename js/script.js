/* =========================================================
   DIGITAL STUDIO
   MAIN JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElements = document.querySelectorAll("#currentYear");

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });



  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const navMenu =
    document.getElementById("navMenu");


  if (mobileMenuButton && navMenu) {

    mobileMenuButton.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("open");


      mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );


      const menuIcon =
        mobileMenuButton.querySelector("i");


      if (menuIcon) {

        if (isOpen) {

          menuIcon.classList.remove("fa-bars");

          menuIcon.classList.add("fa-xmark");

        } else {

          menuIcon.classList.remove("fa-xmark");

          menuIcon.classList.add("fa-bars");

        }

      }

    });



    /* Close mobile menu after a navigation link is clicked */

    const mobileNavLinks =
      navMenu.querySelectorAll("a.nav-link");


    mobileNavLinks.forEach((link) => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );


        const menuIcon =
          mobileMenuButton.querySelector("i");


        if (menuIcon) {

          menuIcon.classList.remove("fa-xmark");

          menuIcon.classList.add("fa-bars");

        }

      });

    });

  }



  /* =======================================================
     LANGUAGE SYSTEM
  ======================================================= */

  const languageButtons =
    document.querySelectorAll(".language-button");


  /*
     Read saved language preference.

     English is used by default if the visitor has never
     selected a language before.
  */

  const savedLanguage =
    localStorage.getItem("digitalStudioLanguage") || "en";


  setLanguage(savedLanguage);



  languageButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selectedLanguage =
        button.dataset.lang;


      if (!selectedLanguage) {
        return;
      }


      localStorage.setItem(
        "digitalStudioLanguage",
        selectedLanguage
      );


      setLanguage(selectedLanguage);

    });

  });



  /* =======================================================
     LANGUAGE FUNCTION
  ======================================================= */

  function setLanguage(language) {

    /*
       Update language button appearance.
    */

    languageButtons.forEach((button) => {

      const isActive =
        button.dataset.lang === language;


      button.classList.toggle(
        "active",
        isActive
      );

    });



    /*
       Update the HTML language attribute.

       This helps browsers, search engines and
       accessibility tools understand the page language.
    */

    document.documentElement.lang = language;



    /*
       IMPORTANT:

       translation.js will define:

       window.translations

       We deliberately check whether it exists so the
       website still works normally while translation.js
       is being built later.
    */

    if (
      typeof window.translations === "undefined" ||
      !window.translations[language]
    ) {

      return;

    }


    const languageData =
      window.translations[language];


    const translatableElements =
      document.querySelectorAll("[data-i18n]");


    translatableElements.forEach((element) => {

      const translationKey =
        element.dataset.i18n;


      const translatedText =
        getTranslation(
          languageData,
          translationKey
        );


      if (
        translatedText !== undefined &&
        translatedText !== null
      ) {

        element.innerHTML =
          translatedText;

      }

    });



    /*
       Translate placeholders separately.

       We'll use data-i18n-placeholder later where needed.
    */

    const placeholderElements =
      document.querySelectorAll(
        "[data-i18n-placeholder]"
      );


    placeholderElements.forEach((element) => {

      const translationKey =
        element.dataset.i18nPlaceholder;


      const translatedPlaceholder =
        getTranslation(
          languageData,
          translationKey
        );


      if (
        translatedPlaceholder !== undefined &&
        translatedPlaceholder !== null
      ) {

        element.setAttribute(
          "placeholder",
          translatedPlaceholder
        );

      }

    });

  }



  /* =======================================================
     TRANSLATION LOOKUP
  ======================================================= */

  function getTranslation(
    translationObject,
    path
  ) {

    if (
      !translationObject ||
      !path
    ) {

      return undefined;

    }


    return path
      .split(".")
      .reduce(
        (currentValue, key) => {

          if (
            currentValue &&
            Object.prototype.hasOwnProperty.call(
              currentValue,
              key
            )
          ) {

            return currentValue[key];

          }

          return undefined;

        },
        translationObject
      );

  }



  /* =======================================================
     CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP SIZE
  ======================================================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 820 &&
      navMenu &&
      mobileMenuButton
    ) {

      navMenu.classList.remove("open");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
      );


      const menuIcon =
        mobileMenuButton.querySelector("i");


      if (menuIcon) {

        menuIcon.classList.remove("fa-xmark");

        menuIcon.classList.add("fa-bars");

      }

    }

  });



  /* =======================================================
     ESCAPE KEY CLOSES MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        navMenu &&
        navMenu.classList.contains("open")
      ) {

        navMenu.classList.remove("open");


        if (mobileMenuButton) {

          mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
          );


          const menuIcon =
            mobileMenuButton.querySelector("i");


          if (menuIcon) {

            menuIcon.classList.remove(
              "fa-xmark"
            );

            menuIcon.classList.add(
              "fa-bars"
            );

          }

        }

      }

    }
  );

});
