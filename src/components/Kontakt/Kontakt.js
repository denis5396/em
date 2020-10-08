import React, { useEffect } from 'react';
import Snav from '../Onama/Snav';
import styles from './Kontakt.module.css';
const Kontakt = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Elektro Plus | Kontakt';
    return () => {
      document.querySelector('html').style.scrollBehavior = 'smooth';
    };
  }, []);

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
                <p>Maršala Tita 4, Sarajevo</p>
              </div>
              <div class={styles.contactcol}>
                <i class="fas fa-phone-alt fa-3x"></i>
                <h3>Telefonski broj</h3>
                <p>+387 33 246 495</p>
              </div>
              <div class={styles.contactcol}>
                <i class="fas fa-envelope-open-text fa-3x"></i>
                <h3>E-mail</h3>
                <p>ElektroPlus@gmail.com</p>
              </div>
              <div class={styles.contactcol}>
                <i class="fas fa-business-time fa-3x"></i>
                <h3>Radno vrijeme</h3>
                <p>pon-pet: 08:00 - 17:00 / sub: 15:00</p>
              </div>
            </div>
            <div id={styles.contactbr}>
              <iframe
                id="map"
                width="500"
                height="600"
                gestureHandling="greedy"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=520&amp;height=520&amp;hl=en&amp;q=titova%204%20Sarajevo+(Mar%C5%A1ala%20Tita%204)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
        <form action="#">
          <label for="poruka">Pitanje</label>
          <textarea name="poruka" id="poruka" cols="30" rows="10"></textarea>
          <label for="name">Ime i Prezime</label>
          <input type="text" name="name" id="name" />
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
          <input type="submit" value="Pošaljite" />
        </form>

        <a style={{ opacity: 0 }} href="http://maps-generator.com/">
          embedding google map
        </a>
      </section>
    </>
  );
};

export default Kontakt;
