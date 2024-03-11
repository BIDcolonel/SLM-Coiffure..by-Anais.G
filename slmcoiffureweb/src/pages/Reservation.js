import React from 'react';
import '../components/css/Reservation.css';

const Reservation = () => {
  return (
    <div>
      <h1>Réserver une prestation</h1>

      <div class="container">
      {/* Texte explicite */}
      <div className="confirmation-text">
        <p>Nous vous remercions de votre réservation.</p>
        <p>Veuillez noter que votre rendez-vous ne sera confirmé qu'après avoir effectué le paiement avec le type de prestation demandé.</p>
        <p>Cela garantit que nous pouvons fournir la meilleure expérience possible et réserver le créneau horaire spécifique pour vos besoins.</p>
        <p>Merci pour votre compréhension et votre coopération.</p>
      </div>

      <form>
        {/* Vos champs de réservation existants */}
        <iframe src="https://calendar.app.google/gg4XmVWdKoj1kxs2A" title="Calendrier de réservation" className="calendar-iframe"></iframe>
      </form>

      {/* Formulaire de paiement PayPal */}
      <div className="paypal-form">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="NTRXRSRVBWYXC" />
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="hidden" name="on0" value="Prestation demandé"/>
                  Prestation demandé
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="os0" maxLength="200" />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="hidden" name="currency_code" value="EUR" />
          <input type="image" src="https://www.paypalobjects.com/fr_FR/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal, votre réflexe sécurité pour payer en ligne." alt="Acheter" />
        </form>
      </div>
      </div>
    </div>
  );
};

export default Reservation;
