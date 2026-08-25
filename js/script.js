/* =========================================================
   DIGITAL STUDIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll("#currentYear");


  const currentYear =
    new Date().getFullYear();


  yearElements.forEach((element) => {

    element.textContent =
      currentYear;

  });



  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");


  const navMenu =
    document.getElementById("navMenu");


  if (mobileMenuButton && navMenu) {

    mobileMenuButton.addEventListener(
      "click",
      () => {

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

            menuIcon.classList.remove(
              "fa-bars"
            );


            menuIcon.classList.add(
              "fa-xmark"
            );

          } else {

            menuIcon.classList.remove(
              "fa-xmark"
            );


            menuIcon.classList.add(
              "fa-bars"
            );

          }

        }

      }
    );



    /* -----------------------------------------------------
       CLOSE MENU AFTER NAVIGATION
    ----------------------------------------------------- */

    const mobileNavLinks =
      navMenu.querySelectorAll(
        "a.nav-link"
      );


    mobileNavLinks.forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          closeMobileMenu();

        }
      );

    });

  }



  /* =======================================================
     LANGUAGE SYSTEM
  ======================================================= */

  const languageButtons =
    document.querySelectorAll(
      ".language-button"
    );


  /*
     Spanish is the default.

     If the visitor has previously chosen English or Spanish,
     their saved preference takes priority.
  */

  const savedLanguage =
    localStorage.getItem(
      "digitalStudioLanguage"
    );


  const startingLanguage =
    savedLanguage === "en" ||
    savedLanguage === "es"
      ? savedLanguage
      : "es";


  setLanguage(
    startingLanguage,
    false
  );



  /* -------------------------------------------------------
     LANGUAGE BUTTON EVENTS
  ------------------------------------------------------- */

  languageButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const selectedLanguage =
          button.dataset.lang;


        if (
          selectedLanguage !== "en" &&
          selectedLanguage !== "es"
        ) {

          return;

        }


        setLanguage(
          selectedLanguage,
          true
        );

      }
    );

  });



  /* =======================================================
     SET LANGUAGE
  ======================================================= */

  function setLanguage(
    language,
    savePreference = true
  ) {

    /*
       Save the visitor's preference only when appropriate.
    */

    if (savePreference) {

      localStorage.setItem(
        "digitalStudioLanguage",
        language
      );

    }



    /*
       Tell browsers and accessibility tools what
       language the current page is using.
    */

    document.documentElement.lang =
      language;



    /*
       Update all EN / ES buttons in both
       the header and footer.
    */

    languageButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.lang === language
      );

    });



    /*
       Confirm translation data exists.
    */

    if (
      typeof window.translations ===
        "undefined" ||
      !window.translations[language]
    ) {

      console.warn(
        `Translation data not found for: ${language}`
      );

      return;

    }


    const languageData =
      window.translations[language];



    /* -----------------------------------------------------
       STANDARD TEXT TRANSLATIONS
    ----------------------------------------------------- */

    const translatableElements =
      document.querySelectorAll(
        "[data-i18n]"
      );


    translatableElements.forEach(
      (element) => {

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

          /*
             innerHTML is intentional.

             Several translations contain <span>
             elements used for colorful headline text.
          */

          element.innerHTML =
            translatedText;

        }

      }
    );



    /* -----------------------------------------------------
       FORM PLACEHOLDERS
    ----------------------------------------------------- */

    const placeholderElements =
      document.querySelectorAll(
        "[data-i18n-placeholder]"
      );


    placeholderElements.forEach(
      (element) => {

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

      }
    );



    /* -----------------------------------------------------
       OPTIONAL ARIA LABEL TRANSLATIONS

       Supported for future use.
    ----------------------------------------------------- */

    const ariaElements =
      document.querySelectorAll(
        "[data-i18n-aria]"
      );


    ariaElements.forEach(
      (element) => {

        const translationKey =
          element.dataset.i18nAria;


        const translatedAria =
          getTranslation(
            languageData,
            translationKey
          );


        if (
          translatedAria !== undefined &&
          translatedAria !== null
        ) {

          element.setAttribute(
            "aria-label",
            translatedAria
          );

        }

      }
    );

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
            currentValue !== undefined &&
            currentValue !== null &&
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
     PROJECT INTAKE FORM → WHATSAPP
  ======================================================= */

  const projectForm =
    document.getElementById(
      "projectForm"
    );


  if (projectForm) {

    projectForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();



        /* -------------------------------------------------
           RUN STANDARD HTML VALIDATION FIRST
        ------------------------------------------------- */

        if (
          !projectForm.checkValidity()
        ) {

          projectForm.reportValidity();

          return;

        }



        /* -------------------------------------------------
           COLLECT FORM DATA
        ------------------------------------------------- */

        const formData =
          new FormData(
            projectForm
          );


        const name =
          formData.get("name") || "";


        const business =
          formData.get("business") || "";


        const email =
          formData.get("email") || "";


        const phone =
          formData.get("whatsapp") || "";


        const projectType =
          formData.get("project_type") || "";


        const selectedServices =
          formData.getAll("services");


        const domain =
          formData.get("domain") || "";


        const siteLanguage =
          formData.get("language") || "";


        const website =
          formData.get("website") || "";


        const projectDescription =
          formData.get("message") || "";



        /* -------------------------------------------------
           DETERMINE CURRENT SITE LANGUAGE
        ------------------------------------------------- */

        const currentLanguage =
          document.documentElement.lang === "en"
            ? "en"
            : "es";



        /* =================================================
           FRIENDLY FORM LABELS
        ================================================= */

        const formLabels = {

          en: {

            projectTypes: {

              retail:
                "Retail / Product",

              services:
                "Professional Services",

              education:
                "Education",

              creator:
                "Creator / Personal Brand",

              community:
                "Community / Content",

              other:
                "Something Else"

            },


            services: {

              website:
                "New Website",

              update:
                "Existing Website Update",

              social:
                "Social Media Integration",

              whatsapp:
                "WhatsApp Business",

              google:
                "Google Business Profile",

              domain:
                "Domain & Launch Setup",

              maintenance:
                "Ongoing Maintenance",

              unsure:
                "Not Sure Yet"

            },


            domainAnswers: {

              yes:
                "Yes",

              no:
                "No",

              unsure:
                "Not Sure"

            },


            languages: {

              english:
                "English",

              spanish:
                "Spanish",

              bilingual:
                "English + Spanish"

            }

          },


          es: {

            projectTypes: {

              retail:
                "Retail / Producto",

              services:
                "Servicios Profesionales",

              education:
                "Educación",

              creator:
                "Creador / Marca Personal",

              community:
                "Comunidad / Contenido",

              other:
                "Otro"

            },


            services: {

              website:
                "Nuevo Sitio Web",

              update:
                "Actualizar un Sitio Existente",

              social:
                "Integración de Redes Sociales",

              whatsapp:
                "WhatsApp Business",

              google:
                "Perfil de Negocio en Google",

              domain:
                "Dominio y Lanzamiento",

              maintenance:
                "Mantenimiento Continuo",

              unsure:
                "Todavía No Estoy Seguro"

            },


            domainAnswers: {

              yes:
                "Sí",

              no:
                "No",

              unsure:
                "No Estoy Seguro"

            },


            languages: {

              english:
                "Inglés",

              spanish:
                "Español",

              bilingual:
                "Inglés + Español"

            }

          }

        };



        const labels =
          formLabels[currentLanguage];



        /* -------------------------------------------------
           CREATE READABLE VALUES
        ------------------------------------------------- */

        const readableProjectType =
          labels.projectTypes[
            projectType
          ] ||
          (
            currentLanguage === "es"
              ? "No seleccionado"
              : "Not selected"
          );


        const readableDomain =
          labels.domainAnswers[
            domain
          ] ||
          (
            currentLanguage === "es"
              ? "No seleccionado"
              : "Not selected"
          );


        const readableSiteLanguage =
          labels.languages[
            siteLanguage
          ] ||
          (
            currentLanguage === "es"
              ? "No seleccionado"
              : "Not selected"
          );



        const readableServices =
          selectedServices.length
            ? selectedServices.map(
                (service) =>
                  labels.services[
                    service
                  ] ||
                  service
              )
            : [
                currentLanguage === "es"
                  ? "Ninguno seleccionado"
                  : "None selected"
              ];



        const servicesText =
          readableServices
            .map(
              (service) =>
                `✓ ${service}`
            )
            .join("\n");



        /* =================================================
           BUILD WHATSAPP MESSAGE
        ================================================= */

        let whatsappMessage;


        if (
          currentLanguage === "es"
        ) {

          whatsappMessage =
`¡Hola Digital Studio! Me gustaría conversar sobre un proyecto.

INFORMACIÓN DE CONTACTO

Nombre: ${name || "No proporcionado"}
Negocio / Proyecto: ${business || "No proporcionado"}
Correo: ${email || "No proporcionado"}
WhatsApp / Teléfono: ${phone || "No proporcionado"}

INFORMACIÓN DEL PROYECTO

Tipo de proyecto:
${readableProjectType}

Servicios solicitados:
${servicesText}

¿Ya tiene un dominio?
${readableDomain}

Idioma del sitio:
${readableSiteLanguage}

Sitio web o red social actual:
${website || "Ninguno"}

DESCRIPCIÓN DEL PROYECTO

${projectDescription || "No proporcionada"}

¡Gracias!`;

        } else {

          whatsappMessage =
`Hi Digital Studio! I'd like to discuss a project.

CONTACT INFORMATION

Name: ${name || "Not provided"}
Business / Project: ${business || "Not provided"}
Email: ${email || "Not provided"}
WhatsApp / Phone: ${phone || "Not provided"}

PROJECT INFORMATION

Project Type:
${readableProjectType}

Requested Services:
${servicesText}

Already Own a Domain?
${readableDomain}

Website Language:
${readableSiteLanguage}

Current Website / Social Page:
${website || "None"}

PROJECT DESCRIPTION

${projectDescription || "Not provided"}

Thank you!`;

        }



        /* =================================================
           DIGITAL STUDIO WHATSAPP

           Ecuador local:
           099 374 4247

           International:
           +593 99 374 4247

           wa.me:
           593993744247
        ================================================= */

        const whatsappNumber =
          "593993744247";



        const whatsappURL =
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`;



        /* -------------------------------------------------
           OPEN WHATSAPP
        ------------------------------------------------- */

        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }



  /* =======================================================
     CLOSE MOBILE MENU FUNCTION
  ======================================================= */

  function closeMobileMenu() {

    if (
      !navMenu ||
      !mobileMenuButton
    ) {

      return;

    }


    navMenu.classList.remove(
      "open"
    );


    mobileMenuButton.setAttribute(
      "aria-expanded",
      "false"
    );


    const menuIcon =
      mobileMenuButton.querySelector(
        "i"
      );


    if (menuIcon) {

      menuIcon.classList.remove(
        "fa-xmark"
      );


      menuIcon.classList.add(
        "fa-bars"
      );

    }

  }



  /* =======================================================
     CLOSE MENU WHEN SCREEN RETURNS TO DESKTOP
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 820
      ) {

        closeMobileMenu();

      }

    }
  );



  /* =======================================================
     ESCAPE KEY CLOSES MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        navMenu &&
        navMenu.classList.contains(
          "open"
        )
      ) {

        closeMobileMenu();

      }

    }
  );


});
