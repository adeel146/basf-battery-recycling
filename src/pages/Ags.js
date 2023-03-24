import React, {useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Ags() {
  useEffect(() => {
    window._paq.push(["setUserId", (localStorage.getItem("email"))?localStorage.getItem("email"):"anonymousUser"]);
    window._paq.push(["trackPageView"]);
  },[]);
  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md={5}>
            <h3 style={{ padding: "50px 50px 50px 0", color: "#024a96" }}></h3>

            <div>
              <b>
                Anbieterin des Battery Recycling Portals
                <br /> (nachfolgend „Portal“) ist:
                <br /> BASF SE
                <br /> Carl-Bosch-Str. 38
                <br /> 67056 Ludwigshafen
                <br /> (siehe Impressum)
              </b>
            </div>
            <ol style={{ paddingLeft: "1rem", fontSize: "15px" }}>
              <li style={{ marginTop: "10px" }}>
                {" "}
                <b>Allgemeine Informationen</b>
                <p>
                  BASF SE, Carl-Bosch-Straße 38, 67056 Ludwigshafen, Deutschland
                  (&quot; <strong>BASF</strong>&quot;) ist im Rahmen der „Ausschreibung
                  Nr. 202120085 / Entsorgung HVS Speicher / Gross-Pilot
                  Kreislaufwirtschaft“ mit der Vermittlung der Entsorgung von
                  BEV und PHEV-Hochvoltspeichern, Modulen und Zellen beauftragt
                  worden (nachfolgend auch „ <strong>Separater Vertrag</strong>
                  “). In diesem Zusammenhang bietet BASF der BMW AG, Petuelring
                  130, 80809 München sowie den berechtigten BMW-Vertragshändlern
                  (nachfolgend „<strong>BMW</strong>“ oder „
                  <strong>Abfallerzeuger</strong>“) unter
                  battery-recycling-portal.basf.com eine Webseite mit
                  Registrierungsfunktion, das Portal, zur unentgeltlichen
                  Nutzung an. Die Bereitstellung des Portals dient somit der
                  Erfüllung der Verpflichtungen der BASF aus dem Separaten
                  Vertrag. Die Nutzung des Portals unterliegt ausschließlich den
                  nachfolgenden Nutzungsbedingungen, sofern nicht im Folgenden
                  abweichend bestimmt. Abweichende oder entgegenstehende
                  Bedingungen werden nicht Bestandteil eines Vertrages mit BASF,
                  es sei denn, BASF hat diesen ausdrücklich schriftlich
                  zugestimmt.
                </p>
              </li>
              <li>
                <b>Umfang und Funktionalitäten</b>
                <p>
                  (1) Über das Portal vermittelt BASF die Abholung und die
                  fachgerechte Entsorgung von BEV und PHEV-Hochvoltspeichern,
                  Modulen und Zellen bei einem BASF Netzwerkpartner
                  („Entsorger“). BASF unterstützt mit dem Portal die Abwicklung
                  der Entsorgung durch die von BASF in ihrer Eigenschaft als
                  Abfallmaklerin vermittelten Entsorger sowie die
                  Nachvollziehbarkeit des Werkstoffstroms.
                  <br /> (2) Das Portal bietet die nachfolgenden
                  Funktionalitäten:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }}>
                  <li>
                    Dokumentation des gesamten Zeitstrahls (erstellt –
                    freigegeben – bereit zur Abholung – abgeholt – verwertet),
                  </li>
                  <li>
                    ggf. Anzeige vertraglich vereinbarter Rückmeldeartikel (z.B.
                    Gewichte, Stellplätze, Behälterarten, Kilometer),
                  </li>
                  <li>
                    Abruf der Liefer- und Übernahmescheine in der vereinbarten
                    Form,
                  </li>
                  <li>
                    Dokumentation und Einsicht in die Historie der Bearbeitung,
                  </li>
                  <li>
                    Dokumentation des Abfallstroms (Brutto / Netto-Gewichte; AVV
                    Nummern; gefahrguttrans-portrechtliche Einstufung) gemäß
                    gültigem Recht,
                  </li>
                  <li>Übersicht über ADR-relevante Informationen,</li>
                  <li>Terminvereinbarung, Terminbestätigung,</li>
                  <li>
                    Detaillierte Bestellhistorie inkl.
                    Transportfähigkeitsstatus, Verpackungsarten, Erstellungs-
                    und Abholdaten
                  </li>
                  <li>
                    Bestell- und ggf. Austauschmöglichkeit für Verpackungen und
                    Füllmaterial{" "}
                  </li>
                </ul>

                <p>
                  (3) Die Dateneingabe und -pflege erfolgt durch den
                  Abfallerzeuger.
                  <br />
                  (4) Die Zurverfügungstellung des Portals lässt die
                  abfallrechtliche Verantwortlichkeit von Abfallerzeuger und
                  Entsorger unberührt. Diese geht weder durch das Portal selbst
                  noch im Zusammenhang mit der Nutzung der von BASF im Rahmen
                  des Portals angebotenen Dienstleistungen über. Insbesondere
                  sind Abfallerzeuger und Entsorger für die Einhaltung ihrer
                  gesetzlichen Rechte und Pflichten, eingeschlossen der
                  Verpflichtung zur Vorlage des Entsorgungsnachweises in der
                  gesetzlich vorgeschriebenen Form, verantwortlich. BASF wird
                  hierbei als Abfallmakler lediglich unterstützend tätig auf
                  Basis eines separaten Vertrages. Abfallerzeuger und Entsorger
                  sind nicht Erfüllungsgehilfen (§ 278 BGB) der BASF.
                  <br /> (5) BASF behält sich das Recht vor, bis zur Beendigung
                  des Portals die Anzahl und den Umfang der zur Verfügung
                  gestellten Funktionen zu erweitern oder zu reduzieren, sofern
                  nicht die grundlegenden Kernfunktionalitäten und/oder
                  Hauptleistungspflichten dadurch eingeschränkt werden. Darüber
                  hinaus behält sich BASF vor, die in dem Portal angebotenen
                  Leistungen zu ändern, zu modifizieren oder abweichende
                  Leistungen anzubieten,
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }}>
                  <li>
                    soweit BASF verpflichtet ist, die Übereinstimmung der von
                    BASF angebotenen Funktionalitäten mit dem auf die Leistungen
                    anwendbaren Recht herzustellen, insbesondere wenn sich die
                    geltende Rechtslage ändert;{" "}
                  </li>
                  <li>
                    soweit BASF damit einem gegen BASF gerichteten
                    Gerichtsurteil oder einer Behördenentscheidung nachkommt;
                  </li>
                  <li>
                    soweit die jeweilige Änderung notwendig ist, um bestehende
                    Sicherheitslücken zu schließen;
                  </li>
                  <li>
                    wenn die Änderung lediglich vorteilhaft für den
                    Abfallerzeuger ist; oder
                  </li>
                  <li>
                    wenn die Änderung rein technischer oder prozessualer Natur
                    ohne wesentliche Auswirkungen für den Abfallerzeuger ist.
                  </li>
                </ul>

                <p>
                  Änderungen mit lediglich unwesentlichem Einfluss auf die
                  Funktionen des Portals stellen keine Leistungsänderungen im
                  Sinne dieser Ziffer dar. Dies gilt insbesondere für Änderungen
                  rein graphischer Art und die bloße Änderung der Anordnung von
                  Funktionen. Sofern und soweit BMW Weiterentwicklungen oder
                  zusätzliche Funktionalitäten wünscht, ist dies Gegenstand
                  einer gesonderten Beauftragung und Vergütung. (6) Die Nutzung
                  des Portals erfolgt ausschließlich auf der Grundlage dieser
                  Nutzungsbedingungen, welche BASF und ein Unternehmen, in
                  dessen Namen eine vertretungsberechtigte natürliche Person
                  auftritt, miteinander vor erstmaliger Nutzung abschließen.
                </p>
              </li>
              <li>
                <b>Zugang zu dem Portal </b>
                <p>
                  (1) Der Zugang zu dem Portal ist passwortgeschützt. Um den
                  Zugang zum Portal freizuschalten, muss der Abfallerzeuger ein
                  Benutzerkonto (bestehend aus Benutzername und Passwort;
                  &quot;Zugangsdaten&quot;) einrichten und sich einmalig auf das
                  Portal-Homepage registrieren. Die Freischaltung des Zugangs
                  erfolgt nach einer weiteren Bestätigung durch den
                  Abfallerzeuger (&quot;Double-Opt-In&quot;-Verfahren) und nach
                  Freischaltung des Zugangs durch einen Administrator der BASF.
                  <br />
                  (2) Mit dem Anlegen eines Nutzer-Accounts und dem Einloggen in
                  das Portal erklärt der Abfallerzeuger gegenüber BASF
                  verbindlich, dass er diese Nutzungsbedingungen akzeptiert. Der
                  Abfallerzeuger erklärt zugleich, dass er den Zugang zu dem
                  Portal ausschließlich für seine geschäftlichen Zwecke nutzen
                  wird. Jede Weitergabe der von BASF mitgeteilten
                  Zugangsberechtigung ist untersagt. Jedeandere Nutzung des
                  Portals durch den Abfallerzeuger oder durch Dritte ist
                  untersagt.
                  <br /> (3) Diese Nutzungsbedingungen werden in deutscher
                  Sprache abgeschlossen. Der Abfallerzeuger kann Eingabefehler
                  im Zuge der Erstellung eines Nutzerkontos vor Abschluss
                  jederzeit durch Korrektur der Eingabe korrigieren.
                  <br /> (4) Der Verhaltenskodex der BASF ist unter
                  https://www.basf.com/global/de/who-we-are/organization/management/code-of-conduct.html
                  abrufbar.
                </p>
              </li>
              <li>
                <b>Bereitstellung des Portals </b>
                <p>
                  (1) BASF ermöglicht den Zugang zu und die Nutzung des Portals
                  in angemessenem Umfang. BASF stellt den Zugang zu dem Portal
                  in einer gehosteten Umgebung zur Verfügung, die es dem
                  Abfallerzeuger ermöglicht, das Portal über das Internet zu
                  nutzen, ohne dass er die Software auf seiner eigenen
                  IT-Infrastruktur installieren und betreiben muss.
                  <br /> (2) BASF wird sich im Rahmen des Zumutbaren bemühen,
                  die Verfügbarkeit des Portals für die Nutzung durch den
                  Abfallerzeuger an der Schnittstelle zwischen dem öffentlichen
                  Internet und dem Netzwerk der Hosting-Server von BASF aufrecht
                  zu erhalten. Das Portal ist &quot;verfügbar&quot;, wenn er am Gateway
                  zwischen dem öffentlichen Internet und dem Netzwerk der
                  Hosting-Server von BASF nutzbar ist.
                  <br /> (3) BASF ist bestrebt, einen störungsfreien Betrieb des
                  Portals während der üblichen Geschäftszeiten von BASF in
                  Deutschland zu gewährleisten. Auch außerhalb der üblichen
                  Geschäftszeiten von BASF in Deutschland kann das Portal für
                  den Abfallerzeuger zugänglich sein. Die Abholung und
                  Entsorgung der BEV und PHEV-Hochvoltspeicher, Module und
                  Zellen findet jedoch unabhängig davon zu den vereinbarten
                  Zeiten statt. Aufgrund der Beschaffenheit des Internets und
                  von Computersystemen gewährleistet BASF jedoch nicht den
                  störungsfreien Betrieb des Portals und übernimmt keine Haftung
                  für die Verfügbarkeit der bereitgestellten Anwendung oder
                  Dienste.
                  <br /> (4) BASF steht es frei, den Zugang zu dem Portal ganz
                  oder teilweise, vorübergehend oder dauerhaft aufgrund von
                  Pflegearbeiten, Kapazitätsbelangen und sonstigen nicht von ihr
                  zu vertretenden Ereignissen zu beschränken. Grundsätzlich wird
                  BASF das Portal außerhalb der üblichen Geschäftszeiten
                  pflegen, es sei denn, ein dringendes Ereignis erfordert eine
                  Pflege während der üblichen Geschäftszeiten. BASF hat jedoch
                  keinen Einfluss auf etwaige Wartungs-/Pflegearbeiten und
                  -zeiten etc. der Hard- und Software ihres Drittanbieters, auf
                  dem das Portal gehostet wird. BASF ist insoweit nicht für eine
                  eventuelle Nichtverfügbarkeit des Portals verantwortlich.
                </p>
              </li>
              <li>
                <b>Pflichten des Abfallerzeugers </b>
                <p>
                  (1) Der Abfallerzeuger ist für alle Inhalte, die er über das
                  Portal hochlädt, veröffentlicht oder sonst wie zugänglich
                  macht, allein verantwortlich. Dies betrifft insbesondere die
                  Klassifizierung mit Abfallschlüsseln. Der Abfallerzeuger ist
                  insbesondere dafür verantwortlich, die Rechtmäßigkeit sowohl
                  des Hochladens selbst als auch die Rechtmäßigkeit
                  (insbesondere vor dem Hintergrund anwendbarer
                  Exportkontrollvorschriften) des Inhalts der hochgeladenen
                  Inhalte zu prüfen. BASF prüft die Inhalte nicht, insbesondere
                  nicht auf Vollständigkeit, Richtigkeit, Rechtmäßigkeit,
                  Verfügbarkeit, Qualität und Eignung für einen bestimmten
                  Zweck.
                  <br /> (2) Dem Abfallerzeuger sind jegliche Aktivitäten auf
                  oder im Zusammenhang mit dem Portal untersagt, die gegen
                  geltendes Recht insbesondere auch Exportkontrollrecht
                  verstoßen, Rechte Dritter verletzen oder gegen Grundsätze des
                  Jugendschutzes verstoßen. <br />
                  (3) Darüber hinaus ist es dem Abfallerzeuger unabhängig von
                  einem Rechtsverstoß auch untersagt, folgende Aktivitäten
                  durchzuführen:
                </p>
                
              </li>
            </ol>
          </Col>
          <Col md={1}></Col>
          <Col md={5}>
            <h3 style={{ padding: "50px 50px 50px 0", color: "#024a96" }}>
              Nutzungsbedingungen für
              <br /> das Battery Recycling Portal
            </h3>
            <ol start="6" style={{ paddingLeft: "1rem", fontSize: "15px" }}>
              <li>
                <b>Nutzungsrechte an dem Portal </b>
                <p>
                  (1) BASF räumt dem Abfallerzeuger mit erfolgreicher
                  Registrierung das nicht ausschließliche, nicht übertragbare
                  und widerrufliche, zeitlich auf die Dauer der Registrierung
                  beschränkte Recht ein, das Portal nach Maßgabe dieser
                  Nutzungsbedingungen zu nutzen. Die auf dem Portal seitens BASF
                  bereitgestellten Inhalte sind urheberrechtlich oder durch
                  andere gewerbliche Schutzrechte geschützt. Inhaber der Rechte
                  sind BASF, ihre Geschäftspartner oder sonstige Dritte, die die
                  jeweiligen Inhalte zur Verfügung gestellt haben. Das Portal
                  und die dort seitens BASF zur Verfügung gestellten Inhalte
                  dürfen daher vom Abfallerzeuger nicht verändert, erweitert,
                  bearbeitet, kopiert und/oder anderweitig verbreitet werden.
                  <br />
                  (2) Der Abfallerzeuger ist verpflichtet, das Portal oder
                  andere Bestandteile davon nicht zu vervielfältigen, zu
                  verbreiten, zu verändern oder davon abgeleitete Werke zu
                  erstellen und das Portal nicht zurückzuentwickeln oder zu
                  dekompilieren, es sei denn, dies ist nach zwingendem Recht
                  zulässig.
                  <br /> (3) Soweit der Abfallerzeuger Inhalte auf dem Portal
                  veröffentlicht oder hochlädt, räumt er BASF ein kostenfreies,
                  zeitlich auf die Dauer der Registrierung beschränktes,
                  nicht-ausschließliches, an BASF Gruppengesellschaften
                  unterlizenzierbares und übertragbares Recht zur Nutzung daran
                  ein, sofern und soweit dies zur Erreichung der vertraglich
                  verfolgten Zwecke erforderlich ist. Dies beinhaltet
                  insbesondere das Recht, die von dem Abfallerzeuger auf dem
                  Portal veröffentlichten oder hochgeladenen Inhalte zur
                  Bereitstellung des Portals nach diesen Nutzungsbedingungen und
                  der Erfüllung der Pflichten aus dem Separaten Vertrag zu
                  speichern, zu vervielfältigen und in einem
                  Ausfallrechenzentrum vorzuhalten. BASF ist berechtigt, die
                  Inhalte an Dritte weiterzugeben, sofern und soweit dies für
                  die Erfüllung der Pflichten aus dem Separaten Vertrag
                  erforderlich ist, z.B. bei einer notwendigen Weitergabe von
                  Inhalten an den Entsorger oder sofern technische Gründe des
                  Portals dies erfordern.
                </p>
              </li>
              <li>
                <b>Dauer der Nutzung und Beendigung</b>
                <p>
                  (1) Die Laufzeit dieser Nutzungsbedingungen ist gekoppelt an
                  die Laufzeit des Separaten Vertrags. Etwaige ordentliche
                  Kündigungsrechte richten sich nach dem Separaten Vertrag. (2)
                  Das Recht jeder Partei, diese Nutzungsbedingungen aus
                  wichtigem Grund mit sofortiger Wirkung zu kündigen, bleibt
                  unberührt. BASF kann insbesondere bei einem Verstoß des
                  Abfallerzeugers gegen diese Nutzungsbedingungen das Recht des
                  Abfallerzeugers zum Zugang und zur Nutzung des Portals
                  jederzeit außerordentlich kündigen, sofern der Abfallerzeuger
                  nach einer vorherigen entsprechenden Mitteilung der BASF dem
                  Rechtsverstoß nicht abgeholfen hat. (3) Mit Beendigung dieser
                  Nutzungsbedingungen wird der Abfallerzeuger die Nutzung des
                  Portals unverzüglich einstellen und erkennt an, dass BASF den
                  Zugang des Abfallerzeuger zu diesem sperren kann.
                </p>
              </li>
              <li>
                <b>Rechte bei Mängeln und Haftungsbeschränkung</b>
                <p>
                  (1) Soweit und solange das Portal dem Abfallerzeuger
                  unentgeltlich zur Verfügung gestellt wird, ist eine Haftung
                  für Mängel in den Funktionen des Portals und dessen etwaiger
                  Dokumentation sowie für sonstige Schlechtleistungen sowie für
                  weitergehende Schadens- und Aufwendungsersatzansprüche
                  gegenüber dem Abfallerzeuger auf Vorsatz und grobe
                  Fahrlässigkeit beschränkt. Rechte und Pflichten aus dem
                  Separaten Vertrag bleiben hiervon unberührt. Im Falle eines
                  Mangels des Portals, der den Abruf der Vermittlung
                  vorübergehend verhindert, obliegt es dem Abfallerzeuger im
                  Rahmen seiner Schadensminderungspflicht, die Leistungen aus
                  dem Separaten Vertrag für die Dauer des Mangels über die
                  etablierten Kontakte, z.B. per Telefon oder E-Mail, abzurufen.
                  <br />
                  (2) Als Diensteanbieterin ist BASF gemäß § 7 Abs. 1 TMG nur
                  für die eigenen Inhalte und Informationen, die in dem Portal
                  bereitgestellt werden, nach den allgemeinen Gesetzen
                  verantwortlich; BASF ist jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu
                  überwachen. Eine Entfernung oder Sperrung dieser Inhalte
                  erfolgt unverzüglich ab dem Zeitpunkt der Kenntnis einer
                  konkreten Rechtsverletzung. Eine Haftung ist erst ab dem
                  Zeitpunkt der Kenntnisnahme möglich.
                  <br /> (3) Sofern und soweit dieses Nutzungsverhältnis
                  mietrechtlichen Regelungen unterfällt, ist die
                  verschuldensunabhängige Haftung des Anbieters für bereits bei
                  Vertragsschluss vorhandene Mängel gemäß § 536 a Abs. 1 (1.
                  Alternative) BGB ausgeschlossen.
                  <br /> (4) Die vorstehenden Haftungsbeschränkungen gelten
                  nicht, soweit zwingend gehaftet wird, z.B. nach dem
                  Produkthaftungsgesetz, in Fällen des Vorsatzes und der groben
                  Fahrlässigkeit, wegen der Verletzung des Lebens, des Körpers
                  oder der Gesundheit, wegen der Übernahme einer Garantie oder
                  wegen Arglist oder Vorsatzes.
                </p>
              </li>
              <li>
                <b>Datenschutz</b>
                <p>
                  BASF beachtet alle anwendbaren datenschutzrechtlichen
                  Bestimmungen. Weitere Informationen finden Sie in der jeweils
                  gültigen Datenschutzrichtlinie.
                </p>
              </li>
              <li>
                <b>Geheimhaltung</b>
                <p>
                  Für die Nutzung des Portals gilt die zwischen BASF und BMW
                  vereinbarte Geheimhaltungsvereinbarung, welche Bestandteil des
                  Separaten Vertrags geworden ist, entsprechend
                </p>
              </li>
              <li>
                <b>Änderungen der Nutzungsbedingungen</b>
                <p>
                  (1) BASF behält sich das Recht vor, diese Nutzungsbedingungen
                  in Bezug auf Äquivalenzstörungen oder Regelungslücken zu
                  ändern und die Nutzung des Portals durch den Abfallerzeuger
                  entsprechend zu modifizierenden oder weiteren
                  Nutzungsbedingungen zu unterwerfen, wobei sich die
                  vorgenannten Änderungen ausdrücklich nicht auf den Inhalt der
                  von BASF durch das Portal erbrachten Leistungen beziehen
                  werden. Ebenfalls ausgenommen sind Änderungen, welche die
                  vertraglichen Hauptleistungspflichten der Parteien betreffen;
                  diese können nicht wie im Rahmen dieser Klausel beschrieben
                  einseitig geändert werden.
                  <br /> (2) BASF wird dem Abfallerzeuger die geänderten
                  Nutzungsbedingungen mindestens vier (4) Wochen vor dem
                  geplanten Inkrafttreten über die bei der Registrierung
                  angegebene E-Mail-Adresse bekannt geben und auf die
                  Neuregelungen sowie das Datum des geplanten Inkrafttretens
                  gesondert hinweisen. Zugleich wird BASF dem Abfallerzeuger
                  eine angemessene, mindestens zwei (2) Wochen lange Frist
                  einräumen, um die auf diesen Nutzungsbedingungen basierenden
                  Vertragsverhältnisse mit BASF fristlos zu kündigen, falls der
                  Nutzer mit den geänderten Nutzungsbedingungen nicht
                  einverstanden ist. Der Nutzer kann sein Kündigungsrecht z.B.
                  dadurch ausüben, indem er sein Benutzerkonto löscht und somit
                  die Nutzung der Dienste einstellt. BASF wird den Nutzer bei
                  Bekanntgabe der geänderten Nutzungsbedingungen auf sein
                  Kündigungsrecht, die hierfür geltende Frist und die Bedeutung
                  des Schweigens hinweisen.
                  <br /> (3) Erfolgt innerhalb der vorgenannten Frist weder eine
                  ausdrückliche Zustimmung noch ein ausdrücklicher Widerspruch
                  oder eine ausdrückliche Kündigung durch den Abfallerzeuger, so
                  gelten mit Ablauf der Frist die geänderten Bedingungen.
                </p>
              </li>
              <li>
                <b>Sonstiges</b>
                <p>
                  (1) Sollten eine oder mehrere Bestimmungen dieser
                  Nutzungsbedingungen wegen Verstoßes gegen geltendes Recht oder
                  aus sonstigen Gründen unwirksam oder undurchführbar sein, so
                  bleiben die Nutzungsbedingungen im Übrigen wirksam. Die
                  unwirksame oder undurchführbare Bestimmung ist durch eine
                  wirksame, durchführbare Bestimmung zu ersetzen, die dem
                  gegenseitigen Verständnis der Parteien am nächsten kommt.
                  <br /> (2) Gültigkeit, Auslegung und Durchführung dieses
                  Vertrages unterliegen dem materiellen Recht der Bundesrepublik
                  Deutschland unter Ausschluss des Kollisionsrechts und des
                  Übereinkommens der Vereinten Nationen über Verträge über den
                  internationalen Warenkauf vom 11.04.1980.
                  <br /> (3) Für alle Streitigkeiten aus oder im Zusammenhang
                  mit diesen Nutzungsbedingungen gilt der gemäß dem Separaten
                  Vertrag vereinbarte Gerichtsstand
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }}>
                  <li>
                    die Verbreitung von Viren, Trojanern und anderen schädlichen
                    Dateien;
                  </li>
                  <li>
                    das Versenden von Junk- oder Spam-Mails und Kettenbriefen;
                  </li>
                  <li>
                    die Verbreitung von beleidigenden, anstößigen, sexuell
                    orientierten, obszönen oder verleumderischen Inhalten oder
                    Mitteilungen sowie solcher Inhalte oder Mitteilungen, die
                    geeignet sind, Rassismus, Fanatismus, Hass, körperliche
                    Gewalt oder rechtswidrige Handlungen zu fördern oder zu
                    unterstützen (jeweils entweder ausdrücklich oder
                    stillschweigend);
                  </li>
                  <li>
                    die Belästigung anderer Nutzer des Portals, z. B. durch
                    mehrfache persönliche Kontaktaufnahme ohne oder gegen die
                    Reaktion des anderen Nutzers sowie die Förderung oder
                    Unterstützung einer solchen Belästigung;{" "}
                  </li>
                  <li>
                    die Aufforderung anderer Nutzer, Passwörter oder persönliche
                    Daten zu kommerziellen oder rechtswidrigen Zwecken
                    preiszugeben;
                  </li>
                  <li>
                    die Verbreitung und/oder öffentliche Wiedergabe von in dem
                    Portal verfügbaren Inhalten.
                  </li>
                  <li>Terminvereinbarung, Terminbestätigung,</li>
                </ul>

                <p>
                  (4) Der Abfallerzeuger ist verpflichtet, seine Zugangsdaten zu
                  seinem Nutzerkonto geheim zu halten und vor dem Zugriff durch
                  Dritte zu schützen. Erlangt der Abfallerzeuger Kenntnis vom
                  Verlust oder Missbrauch seiner Zugangsdaten oder besteht der
                  Verdacht des Missbrauchs seines Nutzerkontos, so hat der
                  Abfallerzeuger BASF unverzüglich zu unterrichten. Eine
                  Weitergabe der Zugangsdaten an Dritte ist untersagt.
                  <br /> (5) Der Abfallerzeuger stellt BASF (einschließlich der
                  Mitglieder der Gesellschaft und etwaiger
                  Dienstleistungsempfänger, deren Mitarbeiter, leitende
                  Angestellte, Direktoren, Aktionäre, Vertreter,
                  Rechtsnachfolger und Bevollmächtigte) von jeglichen
                  Ansprüchen, Klagen, Schadensersatzansprüchen, Kosten,
                  Bußgeldern und Auslagen (einschließlich angemessener
                  Anwaltskosten und Auslagen) oder sonstiger Haftung frei, die
                  aus oder im Zusammenhang mit den Inhalten des Abfallerzeugers
                  in dem Portal entstehen.
                  <br /> (6) BASF behält sich das Recht vor, einen
                  Abfallerzeuger von der Nutzung des Portals auszuschließen,
                  insbesondere wenn gegen diese Nutzungsbedingungen, geltendes
                  Recht oder Rechte Dritter verstoßen wird. BASF ist berechtigt,
                  sämtliche Inhalte endgültig oder zeitlich befristet zu sperren
                  oder zu löschen, wenn diese gegen diese Nutzungsbedingungen
                  und/oder geltendes Recht verstoßen. BASF verpflichtet sich
                  jedoch, den Abfallerzeuger über die Löschung von dessen
                  rechtsverletzenden Inhalten nachträglich und im Falle einer
                  Sperrung seines Kundenkontos grundsätzlich vorab zu
                  informieren.
                </p>
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Ags;
