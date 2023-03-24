import React, { useEffect } from "react";
import { Container} from "react-bootstrap";
import "./Dantenschutz.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Datenschutz() {
  useEffect(() => {
    window._paq.push([
      "setUserId",
      localStorage.getItem("email")
        ? localStorage.getItem("email")
        : "anonymousUser",
    ]);
    window._paq.push(["trackPageView"]);
  }, []);
  return (
    <div>
      <Header />
      <Container>
        <div style={{ width: "70%", marginTop: "50px" }}>
          <h2> Privacy policy</h2>
          <h3 style={{ color: "orange" }}>
            BASF is pleased about your visit to our website and your interest in
            our company.
          </h3>
          <p>
            The topic of data protection has the highest priority at BASF.
            Therefore, we would like to inform you in detail about it in the
            following:
          </p>
          <ol type="A">
            <li>
              Who is responsible for data processing and who is our data
              protection officer?
            </li>
            <li>
              What data do we process, for what purposes, for how long and on
              what legal basis?
            </li>
            <li>Are you obliged to provide us with this data?</li>
            <li>To whom do we pass on your personal data?</li>
            <li>How do we safeguard your personal data?</li>
            <li>What rights do you have?</li>
            <li>Where can you complain?</li>
            <li>Data protection for minors</li>
          </ol>
          <ol type="A">
            <li>
              <b>
                Who is responsible for data processing and who is our data
                protection officer?
              </b>
              <p>
                You can find the person responsible for data processing at{" "}
                <span>
                  <a>Here</a>
                </span>
              </p>
              <p>Our data protection officer is:</p>
              <p>
                Alexandra Haug
                <br />
                EU Data Protection Officer
                <br />
                67056 Ludwigshafen
                <br />
                +49 (0) 621 60-0
              </p>
              <p>e-mail: data-protection.eu@BASF.com</p>
            </li>
            <li>
              <b>
                What data do we process, for what purposes, for how long and on
                what legal basis?
              </b>
              <p>
                In the following, we inform you about the data processing on our
                site (a), its purposes and legal basis (b) as well as the
                respective storage period and, if applicable, specific objection
                and removal options (c).
              </p>
              <ol type="1">
                <li>
                  <ol type="a">
                    <li>
                      <b>Data processing</b>
                      <p>
                        If you visit our website for information purposes only,
                        i.e. if you do not register or transmit data in any
                        other way (e.g. via a contact form), the following
                        information is automatically transmitted from your
                        browser to our server:
                      </p>
                      <p>- IP address of your device </p>
                      <p>- Information about your browser</p>
                      <p>- Name of the website from which you visit us</p>
                      <p>- Name of the visited page (URL) or the opened file</p>
                      <p>- Date and time of your visit</p>
                      <p>- Status information such as error messages</p>
                      <p>
                        - Transferred data volume and the access status (file
                        transferred, file not found, etc.)
                      </p>
                      <p>
                        - Operating system and version of your computer&apos;s
                        operating system and the name of your access provider
                      </p>
                    </li>
                    <li>
                      <b>Purposes and legal basis</b>
                      <p>
                        When you visit the BASF web site, we use the IP address
                        and other information automatically transmitted to our
                        server by your browser under B. 1. a. to
                      </p>
                      <p>(i) provide you with the requested content</p>
                      <p>
                        (ii) ensure the security and stability of our website
                        and to trace unauthorized use
                      </p>
                      <p>(iii) enable a comfortable use of our website.</p>
                      <p>
                        The legal basis for the data processing is Art. 6 para.
                        1 sentence 1 lit. f GDPR. Our legitimate interest
                        follows from the above listed purposes for data
                        processing. Under no circumstances do we use the
                        collected data for the purpose of drawing conclusions
                        about your person.
                      </p>
                    </li>
                    <li>
                      <b>Storage period</b>
                      <p>
                        The data will be deleted as soon as they are no longer
                        necessary for the purpose for which they were collected.
                        In the case of the collection of data for the provision
                        of the website, this is the case when the respective
                        session is ended. In the case of storage of the data in
                        log files, this is the case after seven days at the
                        latest. Storage beyond this period is possible. In this
                        case, the IP addresses are anonymized by deleting the
                        last eight bits, so that an identification of you is no
                        longer possible.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <b>Cookies</b>
                  <ol type="a">
                    <li>
                      <b>Data processing and respective legal basis</b>
                      <p>
                        We use cookies on our website. These are text
                        information that can be stored in the browser on the
                        device of the viewer to a visited website (web server,
                        server). The cookie is either sent from the web server
                        to the browser or generated in the browser by a script
                        (JavaScript). The web server can read this cookie
                        information directly from the server when the user
                        visits this page again or transfer the cookie
                        information to the server via a script of the website.
                        Cookies do not cause any damage to your device, do not
                        contain viruses, trojans or other malware.
                      </p>
                      <p>
                        Information is stored in the cookie that is related to
                        the specific device used. This does not mean, however,
                        that we obtain direct knowledge of your identity.
                      </p>
                      <p>We generally use the following cookies: </p>
                      <p>- Strictly necessary cookies</p>
                      <p>
                        These cookies are necessary for the functioning of the
                        website. In general, these cookies are only set in
                        response to actions you take in response to a service
                        request, such as setting your privacy preferences,
                        logging in, or filling out forms. You can set your
                        browser to block these cookies or to notify you about
                        these cookies. However, some areas of the website may
                        not function properly. The legal basis for the
                        processing of these cookies is Art. 6 para. 1 sentence 1
                        lit. f GDPR. Our legitimate interest follows from the
                        data processing purposes listed under B.1.b.
                      </p>
                      <p>- Performance cookies</p>
                      <p>
                        These cookies enable us to count visits and traffic
                        sources so that we can measure and improve the
                        performance of our website. They help us answering
                        questions about which pages are most popular, which are
                        least used and how visitors move around the site. All
                        information collected by these cookies is aggregated and
                        therefore anonymous. If you do not allow these cookies,
                        we cannot know when you visited our website.
                      </p>
                      <p>
                        The legal basis for the processing of these cookies is
                        your consent pursuant to Art. 6 para. 1 sentence 1 lit.
                        a GDPR, which you have given us by making your selection
                        in the cookie banner or in our Privacy Preference
                        Center.
                      </p>
                      <p>- Functional cookies</p>
                      <p>
                        These cookies enable the website to provide enhanced
                        functionality and personalization. They may be set by us
                        or by third parties whose services we use on our pages.
                        If you do not allow these cookies, some or all of these
                        services may not function properly.
                      </p>
                      <p>
                        The legal basis for the processing of these cookies is
                        your consent in accordance with Art. 6 para. 1 sentence
                        1 lit. a GDPR, which you have given us by making your
                        selection in the cookie banner or in our Privacy
                        Preference Center.
                      </p>
                      <p>
                        You have the right to revoke your consent at any time,
                        without affecting the lawfulness of the processing
                        carried out on the basis of the consent until
                        revocation. To do so, please change the settings in the
                        Privacy Preference Center.
                      </p>
                      <p>- Cookies for marketing purposes</p>
                      <p>
                        These cookies can be set via our website. They may be
                        used by our marketing partners to profile your interests
                        and show you relevant ads on other websites. If you do
                        not allow these cookies, you will experience less
                        targeted advertising.{" "}
                      </p>
                      <p>
                        The legal basis for the processing of these cookies is
                        your consent in accordance with Art. 6 para. 1 sentence
                        1 lit. a GDPR, which you have given us by making your
                        selection in the cookie banner or in our Privacy
                        Preference Center.
                      </p>
                      <p>
                        You have the right to revoke your consent at any time,
                        without affecting the lawfulness of the processing
                        carried out on the basis of the consent until
                        revocation. To do so, please change the settings in the
                        Privacy Preference Center.
                      </p>
                    </li>
                    <li>
                      <b>
                        Specific use of cookies, purposes and storage period
                      </b>
                      <p>
                        Specifically, we use the following cookies, depending on
                        the cookie preferences you set in the Privacy Preference
                        Center. Only the strictly necessary cookies are
                        activated by default. If you do not want this either,
                        you have the option of generally rejecting cookies in
                        your browser. In this case, the functionality of the
                        visited website may be impaired.
                        {/*<span style={{ background: "yellow" }}>*/}
                        {/*  [Automatic insertion of ONETRUST]{" "}*/}
                        {/*</span>{" "}*/}
                        Further details about the respective cookie providers
                        can be found in the Privacy Preference Center, under the
                        respective cookie categories.
                      </p>
                      <div id="ot-sdk-cookie-policy"></div>
                    </li>
                  </ol>
                </li>
                <li>
                  <b>Contact form and e-mail</b>
                  <ol type="a">
                    <li>
                      <b>Data processing</b>
                      <p>
                        Our web pages contain contact forms as well as links to
                        send us an e-mail directly. If you use one of these
                        contact forms, the data which you provide in such forms
                        will be transmitted to us and processed. The mandatory
                        data that must be filled in for electronic contact via
                        the respective contact form are marked with (*). If you
                        provide us with additional data, this is done
                        voluntarily. If you send us an e-mail, we will process
                        the associated metadata and the content of the message.
                      </p>
                    </li>
                    <li>
                      <b>Purpose and legal basis</b>
                      <p>
                        Your data will be processed to enable us to contact you,
                        to process your request and to provide you with our
                        respective services, to prevent misuse of the contact
                        form and to ensure the security of our information
                        technology systems. The legal basis for the processing
                        of data classified as being mandatory is Art. 6 para. 1
                        sentence 1 lit. f GDPR. The aforementioned purposes also
                        include a legitimate interest in the processing of the
                        data. If the purpose of the contact is the conclusion of
                        a contract, the additional legal basis for the
                        processing is Art. 6 para. 1 sentence 1 lit. b GDPR. The
                        legal basis for the processing of the data that you have
                        voluntarily provided us with is your consent in
                        accordance with Art. 6 para. 1 sentence 1 lit. a GDPR.
                      </p>
                    </li>
                    <li>
                      <b>Storage period</b>
                      <p>
                        The personal data of the person concerned will be
                        deleted or made unavailable as soon as the purpose of
                        the storage does no longer apply. Furthermore, data may
                        be stored if this has been provided for by the European
                        or national legislator in EU regulations, laws, or other
                        regulations to which the person responsible is subject.
                        Data will also be deleted or made unavailable when a
                        storage period prescribed by the above-mentioned
                        provisions expires unless there is a need to continue
                        storing the data for the purpose of concluding or
                        fulfilling a contract. In case of a consent, you have
                        the right to revoke such consent at any time, without
                        affecting the lawfulness of the processing carried out
                        on the basis of the consent until revocation. To do so,
                        please change the settings in the Privacy Preference
                        Center.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <b>Email marketing</b>
                  <p>
                    If you have given us your consent to do so, we will process
                    your e-mail address to send you information about our
                    platform, e.g., regarding new features, planned maintenance
                    or onboarding of further stakeholders at regular intervals
                    (e.g., 1-4 newsletters per month) to the e-mail address you
                    have provided. We will share your personal data with other
                    affiliated companies of the BASF Group if they provide IT
                    services for us or if this is necessary for operational
                    reasons. Furthermore, we will pass on your personal data to
                    the technical IT service providers we use from whom we
                    obtain services. Our IT service providers are carefully
                    selected and regularly checked by us. They process personal
                    data only on our behalf and strictly in accordance with our
                    instructions on the basis of corresponding contracts for
                    order processing. We store your personal data collected
                    within the scope of your consent for the above-mentioned
                    purposes until your consent is revoked. The legal basis for
                    the processing of your personal data for the above-mentioned
                    purposes is your consent, Art 6, paragraph 1, lit. a) GDPR.
                    You can revoke your consent at any time with effect for the
                    future by unsubscribing from our marketing emails. You are
                    at liberty to grant or withhold consent. This has no effect
                    on the use of this online battery recycling portal. If you
                    revoke your consent, we will delete your personal data
                    immediately, provided that we process them for marketing
                    purposes on the basis of your consent. Please note that the
                    revocation does not result in the deletion of all your
                    personal data which we process in the course of the business
                    relationship with you, if there is another legal basis for
                    this. The revocation of your consent does not affect the
                    legality of the data processing that has taken place up to
                    that point.
                  </p>
                </li>
                <li>
                  <b>Battery Recycling Platform</b>
                  <p>5.1 User Account</p>
                  <p>
                    If you register for our Battery Recycling Platform, we will
                    process the following personal data for the purpose of
                    creating and administrating your user account:
                  </p>
                  <p>
                    - Company name
                    <br /> - Company address (incl. street, city, and zip code)
                    <br />
                    - Company working hours i.e., pick-up times
                    <br />
                    - Company loading and unloading facilities
                    <br />
                    - Name
                    <br />
                    - E-mail-address
                    <br />
                    - Telephone number of employees
                    <br />
                    - Telephone number of additional contact persons
                    <br />
                  </p>
                  <p>
                    Without a user account, we will not be able providing you
                    with access to our platform. Within your account, you also
                    have the possibility of accessing an overview of your
                    overall orders The legal basis for this processing is Art. 6
                    Sec. 1 lit. f) GDPR.
                  </p>
                  <p>5.2 Order to pickup</p>
                  <p>
                    If you place an order to pick up car batteries, we will
                    process your personal data as listed under Sec. 5.1 for the
                    purpose of performing your order. In this context, we will
                    also involve the companies listed in the table in section D,
                    which are to be considered as service providers responsible
                    for the coordination of the battery transport and/or
                    subsequent processing as well as recycling. In the context
                    of data processing, they are considered as independent
                    controllers. The companies mentioned in the table in section
                    D will involve other transporting agencies and service
                    providers to coordinate the pickup with them. During this
                    procedure, we will transmit your personal data as listed in
                    Sec. 5.1 to the companies mentioned in the table in section
                    D, which will transmit your personal data to its service
                    providers to the extent it is necessary for the performance
                    of your order. During the checkout process, the telephone
                    number of an additional contact person will also be
                    requested, which we process for the purpose of contacting a
                    representative in the case our main business contact
                    concerning the order is not available. The legal basis for
                    this processing is the performance of the contract between
                    BASF and the company you represent and our overriding
                    interest in processing your personal data as a contact
                    person, Art. 6 Sec. 1 lit. f) GDPR.
                  </p>
                  <p>5.3 Messages</p>
                  <p>
                    Within your user account, you have the possibility of
                    sending us messages. If you do so, we will process your
                    personal data as listed under Sec. 5.1 and the content of
                    your message for the purpose of processing your request. The
                    legal basis for this kind of processing is Art. 6 Sec. 1
                    lit. f) GDPR.
                  </p>
                </li>
              </ol>
            </li>
            <li>
              <b>Are you obliged to provide us with this data? </b>
              <p>
                When you visit our website, the information specified in section
                B. 1. a. as well as the information from the cookies classified
                as strictly necessary is processed automatically. The transfer
                of this information is voluntary. Without the provision of this
                personal data, we cannot display the requested page.
              </p>
              <p>If you</p>
              <p>
                - allow us to use cookies that are not classified as strictly
                necessary,
              </p>
              <p>
                - want to contact us and send us an e-mail or use our contact
                form (including the necessary reCAPTCHA query) or
              </p>
              <p>- want to see embedded YouTube videos</p>
              <p>the transfer of the information is voluntary.</p>
              <p>
                If you contact us, we cannot answer your inquiry in the chosen
                way without the provision of the personal data required in the
                individual case. As far as cookies are concerned, the lack of
                consent can lead to a restriction of the functionality of the
                website or parts of it. Embedded videos cannot be played without
                your consent.
              </p>
            </li>
            <li>
              <b>To whom do we pass on your personal data?</b>
              <p>
                Within our company, only persons and departments are granted
                access to your personal data as far as they need it to fulfil
                the abovementioned purposes. We also involve service providers.
                These service providers will only act on our instructions and
                are contractually obliged to comply with the applicable data
                protection requirements.
              </p>
              <table className="pdf-table" style={{ width: "65%" }}>
                <tr>
                  <th>Company</th>
                  <th>Searvices</th>
                  <th>Address</th>
                </tr>
                <tr>
                  <td>BASF Schwarzheide GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Schipkauer Str. 1, 01987 Schwarzheide</td>
                </tr>
                <tr>
                  <td>BASF OY</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Tammasaarenkatu 3, 00180 Helsinki, Finland</td>
                </tr>
                <tr>
                  <td>BASF Corporation</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>25 Middlesex Turnpike, Iselin, NJ 08830, USA</td>
                </tr>
                <tr>
                  <td>Ecobat Logistics GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Emser Straße 11, 56338 Braubach, Germany</td>
                </tr>
                <tr>
                  <td>ROTH International GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Hohenstaufenstraße 58, 92637 Weiden, Germany</td>
                </tr>
                <tr>
                  <td>INTERSEROH Dienstleistungs GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Stollwerckstr. 9a, 51149 Köln, Germany</td>
                </tr>
                <tr>
                  <td>DellCon - mobility solutions</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Ludwigshafener Straße 4, 68766 Hockenheim, Germany</td>
                </tr>
                <tr>
                  <td>Relux Umwelt GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Brückenstraße 9, 32549 Bad Oeynhausen, Germany</td>
                </tr>
                <tr>
                  <td>LogBATT GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Waldstraße 30, 73773 Aichwald, Germany</td>
                </tr>
                <tr>
                  <td>Spreewerk Lübben GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Börnichen 99, 15907 Lübben, Germany</td>
                </tr>
                <tr>
                  <td>REDUX Recycling GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Carl-Legien-Str. 15, 63073 Offenbach, Germany</td>
                </tr>
                <tr>
                  <td>ME-Logistik GmbH</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Industriestr. 4, 82140 Olching, Germany</td>
                </tr>
                <tr>
                  <td>Lars Walch GmbH & Co. KG</td>
                  <td>Transport and recycling of different battery models</td>
                  <td>Raiffeisenstraße 24, 91460 Baudenbach</td>
                </tr>
              </table>
              <p>
                {" "}
                Otherwise, we will only pass on your data to third parties if:
              </p>
              <p>
                - you have given your express consent in accordance with Art. 6
                para. 1 sentence 1 lit. a GDPR,
              </p>
              <p>
                - the disclosure pursuant to Art. 6 para. 1 sentence 1 lit. f
                GDPR is necessary for the assertion, exercise or defense of
                legal claims and there is no reason to assume that you have an
                overriding interest worthy of protection in not disclosing your
                data,
              </p>
              <p>
                - there is a legal obligation for us to pass on the data in
                accordance with Art. 6 para. 1 sentence 1 lit. c GDPR, or
              </p>
              <p>
                - this is legally permissible and, in accordance with Art. 6
                para. 1 sentence 1 lit. b GDPR, is necessary for the fulfilment
                of contractual relationships with you.
              </p>
              <p>
                A transfer of your personal data to service providers in a third
                country will only take place if the special requirements of Art.
                44 ff. GDPR are fulfilled. If and to the extent service
                providers are located in a third country, it may be that either
                the servers of the respective service provider are located in
                the third country or that the servers are located in the EU but
                accessed in cases of support from a third country. Some third
                countries do not have a level of data protection adequate to
                that of the EU, e.g., the USA or China, as authorities might
                have simplified access to personal data in a simplified manner
                or that there are limited rights to such actions. If and to the
                extent you give consent, you expressly give consent to the
                transfer of personal data into the respective third country.
              </p>
            </li>
            <li>
              <b>How do we secure your personal data?</b>
              <p>
                BASF uses technical and organizational security measures to
                protect your personal data from accidental or intentional
                manipulation, loss, destruction, or access by unauthorized
                persons. Our security measures are continuously revised in line
                with technological developments.
              </p>
            </li>
            <li>
              <b>What rights do you have?</b>
              <p>
                You have certain rights under the General Data Protection
                Regulation including the right to request a copy of the personal
                information we hold about you, if you request it from us in
                writing:
              </p>
              <p>
                <strong>Right to access:</strong> the right to obtain access to
                your information (if we’re processing it), and certain other
                information (like that provided in this Privacy Policy);
              </p>
              <p>
                <strong>Right to correct:</strong>
                if your personal information is inaccurate or incomplete you
                have the right to have your personal information rectified;
              </p>
              <p>
                <strong>Right to erasure:</strong> this is also known as ‘the
                right to be forgotten’ and, in simple terms, enables you to
                request the deletion or removal of your information where
                there’s no compelling reason for us to keep using it. This is
                not a general right to erasure; there are exceptions. For
                example, we have the right to continue using your personal data
                if such use is necessary for compliance with our legal
                obligations or for the establishment, exercise or defense of
                legal claims;
              </p>
              <p>
                <strong>Right to restriction of processing:</strong> the right
                to suspend the usage of your personal information or limit the
                way in which we can process it. Please note that this right is
                limited in certain situations: When we are processing your
                personal information that we collected from you with your
                consent you can only request restriction on the basis of: (a)
                inaccuracy of data; (b) where our processing is unlawful and you
                don’t want your personal information erased; (c) you need it for
                a legal claim; or (d) if we no longer need to use the data for
                the purposes for which we hold it. When processing is
                restricted, we can still store your information, but may not use
                it further. We keep lists of people who have asked for
                restriction of the use of their personal information to make
                sure the restriction is respected in future;
              </p>
              <p>
                <strong>Right to data portability:</strong> the right to request
                that we move, copy or transfer (where technically feasible) your
                personal information in a structured, commonly used and
                machine-readable format, for your own purposes across different
                services;
              </p>
              <p>
                <strong>Right to object:</strong> the right to object to our
                processing of your personal information including where we
                process it for our legitimate interests, direct marketing;
              </p>
              <p style={{ border: "1px solid black", padding: "px" }}>
                <strong>Right to withdraw consent: </strong>if you have given
                your consent to anything we do with your personal information,
                you have the right to withdraw your consent at any time
                (although if you do so, it does not mean that anything we have
                done with your personal information with your consent up to that
                point is unlawful). Exercising these rights is free of charge.
                However, you are required to prove your identity by means of a
                two-factor-authentication. We will engage reasonable efforts
                consistent with our legal duty to supply, correct or delete
                personal information about you.
              </p>
              <p>
                To exercise your rights, please contact us, for example by
                e-mail or by post. You will find the contact details in section
                A.
              </p>
            </li>
            <li>
              <b>Where can you complain?</b>
              <p>
                State Commissioner for Data Protection and Freedom of
                Information of Rhineland-Palatinate (Landesbeauftragter für den
                Datenschutz und die Informationsfreiheit Rheinland-Pfalz)
              </p>
              <p>Hintere Bleiche 34</p>
              <p>55116 Mainz</p>
              <a href="https://www.datenschutz.rlp.de/de/general-storage/footer/ueber-den-lfdi/kontakt/">
                https://www.datenschutz.rlp.de/de/general-storage/footer/ueber-den-lfdi/kontakt/
              </a>
              <p>
                E-Mail:{" "}
                <span>
                  <a href="mailTo:poststelle@datenschutz.rlp.de">
                    poststelle@datenschutz.rlp.de
                  </a>
                </span>
              </p>
            </li>
            <li>
              <b>Data protection for minors</b>
              <p>
                This website is intended for persons who are at least 18 years
                old. If a minor submits personal data via this website, we will
                delete this data and not process it further as soon as we become
                aware of this fact.
              </p>
            </li>
          </ol>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Datenschutz;
