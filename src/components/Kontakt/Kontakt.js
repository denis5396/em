import React, { useEffect } from 'react';
import Snav from '../Onama/Snav';
import styles from './Kontakt.module.css';
import emailjs from 'emailjs-com';

const Kontakt = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ELEKTROMONTING | Kontakt';
    return () => {
      document.querySelector('html').style.scrollBehavior = 'smooth';
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const { target } = e;
    console.log(e.target.children);
    let bool = true;
    for (let i = 0; i < e.target.children.length; i++) {
      if (e.target.children[i].value === '') {
        bool = false;
        break;
      }
    }
    if (bool) {
      emailjs
        .sendForm(
          'service_s3saejc',
          'template_n6mm66e',
          e.target,
          'user_Uq8OtVIvwDn5AORyhXR0D'
        )
        .then(
          (result) => {
            console.log(result.text);
            alert('success');
            target.reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const onMouseOverSubmit = (e) => {
    e.target.style.backgroundColor = 'rgba(3, 169, 244, 0.8)';
  };

  const onMouseOutSubmit = (e) => {
    e.target.style.backgroundColor = 'rgb(3, 169, 244)';
  };

  return (
    <>
      <section id={styles.contactshowcase}>
        <Snav cur={'kontakt'} />
      </section>
      <section id={styles.contact}>
        <div id={styles.contactb}>
          <div id={styles.contactbl}>
            <div id={styles.contactblicons}>
              <h2>Kontaktirajte nas, mi vas očekujemo</h2>

              <div class={styles.contactcol}>
                <i class="fas fa-map-marker-alt fa-3x"></i>
                <h3>Lokacija</h3>
                <p>Most Spasa 64 Ilidža</p>
              </div>
              <div class={styles.contactcol}>
                <i class="fas fa-phone-alt fa-3x"></i>
                <h3>Telefonski broj</h3>
                <p>+387 62 430 995</p>
              </div>
              <div class={styles.contactcol}>
                <i class="fas fa-envelope-open-text fa-3x"></i>
                <h3>E-mail</h3>
                <p>elektromontingemail@gmail.com</p>
              </div>
              <div class={styles.contactcol} style={{ textAlign: 'center' }}>
                <i class="fas fa-business-time fa-3x"></i>
                <h3>Radno vrijeme</h3>
                <p>pon-pet: 08:00 - 17:00 / sub: 08:00 - 15:00</p>
              </div>
              <div class={styles.contactcol} style={{ textAlign: 'center' }}>
                <i class="fab fa-facebook fa-3x"></i>
                <h3>Facebook</h3>
                <a
                  style={{
                    textDecoration: 'none',
                    fontSize: '1.4rem',
                    color: 'blue',
                  }}
                  href="https://www.facebook.com/elektro.monting"
                  target="_blank"
                >
                  ELEKTROMONTING Facebook
                </a>
              </div>
              {/* <div class={styles.contactcol}>
                <i class="fab fa-facebook-square fa-2x"></i>
                <h3>Facebook</h3>
                <a
                  style={{ textDecoration: 'none', color: 'wheat' }}
                  href="https://www.facebook.com/elektro.monting"
                  target="_blank"
                >
                  ELEKTROMONTING Facebook
                </a>
              </div> */}
            </div>
            <div id={styles.contactbr}>
              <div id={styles.whiteBox}>
                <h1>Most Spasa 64 Ilidža</h1>
              </div>
              {/* <iframe
                id="map"
                width="500"
                height="600"
                gestureHandling="greedy"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=520&amp;height=520&amp;hl=en&amp;q=titova%204%20Sarajevo+(Mar%C5%A1ala%20Tita%204)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe> */}
              <iframe
                id="map"
                width="500"
                height="600"
                gestureHandling="greedy"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4842.099510683959!2d18.318959293261585!3d43.81167122590693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758ca01077e7327%3A0x7aac884de37f270d!2sMost%20Spasa!5e0!3m2!1sen!2sba!4v1612983683286!5m2!1sen!2sba"
              ></iframe>
            </div>
          </div>
        </div>
        <form action="#" onSubmit={(e) => sendEmail(e)}>
          <label for="poruka">Pitanje</label>
          <textarea name="poruka" id="poruka" cols="30" rows="10"></textarea>
          <label for="name">Ime i Prezime</label>
          <input type="text" name="name" id="name" />
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
          <input
            style={{ width: '100%' }}
            type="submit"
            value="Pošaljite"
            onMouseOver={(e) => onMouseOverSubmit(e)}
            onMouseOut={(e) => onMouseOutSubmit(e)}
          />
        </form>

        <a style={{ opacity: 0 }} href="http://maps-generator.com/">
          embedding google map
        </a>
      </section>
    </>
  );
};

export default Kontakt;
