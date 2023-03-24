import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import {
  numbersList,
  _b120e017_2b79_45ed_a3b5_b7bbbd83a351,
  _bc315c0e_29c1_4758_8489_8a066eaf4675,
} from "../../../common/constants/constants";
import { cartCheckout } from "../../../common/services/OrderServices";
import CheckBox from "../../../common/ui/CheckBox";
import Dropdown from "../../../common/ui/DropDown";
import TextField from "../../../common/ui/TextField";
import BreadCrumb from "../../BreadCrumb";
import { trackingView } from "../../../common/utils/PageDetails";
import PropTypes from "prop-types";
const CheckOut = (props) => {
  trackingView({ value: "/check-out" });

  const history = useHistory();
  const [packagingList, setPackagingList] = useState([]);
  const [replacementPackaging, setReplacementPackaging] = useState([]);
  const [isContactPerson, setIsContactPerson] = useState(false);
  const [isSwapNeeded, setIsSwapNeeded] = useState(false);
  const [isReadyForPickUp, setIsReadyForPickUp] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [notes, setnotes] = useState("");
  const validate = Yup.object({
    // note: Yup.string().max(5),
  });
  useEffect(() => {
    let dashboardDataLocalStorage = JSON.parse(
      localStorage.getItem("dashboardData")
    );
    setDashboardData(dashboardDataLocalStorage);
    let array = [];
    array.push({
      packagingTypeId: _b120e017_2b79_45ed_a3b5_b7bbbd83a351,
      count: 1,
      hieghtInCm: 0,
    });
    setPackagingList([...array]);

    let array2 = [];
    array2.push({
      packagingTypeId: _b120e017_2b79_45ed_a3b5_b7bbbd83a351,
      count: 0,
    });
    array2.push({
      packagingTypeId: _bc315c0e_29c1_4758_8489_8a066eaf4675,
      count: 0,
    });
    setReplacementPackaging([...array2]);
  }, []);

  const PackagingTypeReplacement = (list2, value, i) => {
    if (replacementPackaging.length === 1) {
      list2[0].packagingTypeId = value;
    } else {
      list2[i].packagingTypeId = value;
    }
  };

  const numbersReplacement = (list2, value, i) => {
    if (replacementPackaging.length === 1) {
      list2[0].count = +value;
    } else {
      list2[i].count = +value;
    }
  };
  const packagingType = (list, value, i) => {
    if (packagingList.length === 1) {
      list[0].packagingTypeId = value;
      if (value === _bc315c0e_29c1_4758_8489_8a066eaf4675) {
        list[0].hieghtInCm = 0;
      }
    } else {
      list[i].packagingTypeId = value;
      if (value === _bc315c0e_29c1_4758_8489_8a066eaf4675) {
        list[i].hieghtInCm = 0;
      }
    }
  };

  const number = (list, value, i) => {
    if (packagingList.length === 1) {
      list[0].count = +value;
    } else if (value === "0") {
      list.splice(i, 1);
    } else {
      list[i].count = +value;
    }
  };
  const handleChange = (e, key, i, name) => {
    let value = e.target.value;
    let list = packagingList;
    let list2 = replacementPackaging;
    if (key === "packagingType" && name === "replacement") {
      PackagingTypeReplacement(list2, value, i);
    } else if (key === "numbers" && name === "replacement") {
      numbersReplacement(list2, value, i);
    } else if (key === "packagingType") {
      packagingType(list, value, i);
    } else if (key === "numbers") {
      number(list, value, i);
    } else if (key === "totalHeight") {
      if (packagingList.length === 1) {
        list[0].hieghtInCm = +value;
      } else {
        list[i].hieghtInCm = +value;
      }
    } else if (key === "isSwapNeeded") {
      let checked = e.target.checked;
      setIsSwapNeeded(checked);
    } else if (key === "isReadyForPickUp") {
      let checked = e.target.checked;
      setIsReadyForPickUp(checked);
      setButtonLoading(!buttonLoading);
    } else if (key === "isContactPerson") {
      let checked = e.target.checked;
      setIsContactPerson(checked);
    }
    setPackagingList([...list]);
  };
  const addNewPackageType = () => {
    let list = packagingList;
    list.push({
      packagingTypeId: _b120e017_2b79_45ed_a3b5_b7bbbd83a351,
      count: 1,
      hieghtInCm: 0,
    });
    setPackagingList([...list]);
  };
  const handleSubmit = async (formik) => {
    console.log(replacementPackaging);
    if (formik.isValid && Object.keys(formik.touched).length > 0) {
      let obj = {
        packaging: packagingList,
        isSwapNeeded,
        isReadyForPickUp,
        isContactPerson,
        comments: notes,
      };

      if (isSwapNeeded) {
        obj.replacementPackaging = replacementPackaging;
      }
      if (isContactPerson) {
        obj.notes = formik?.values?.notes;
      }
      setButtonLoading(false);
      let result = await cartCheckout(obj);
      if (result?.success) {
        history.push("/assignments");
        setButtonLoading(true);
      } else {
        toast.error(result?.message);
        setButtonLoading(true);
      }
    }
  };

  const { setScreen } = props;
  const breadcrumb = [
    { name: "Service Auswahl", activate: false, link: "/select-service" },
    { name: "Produktübersicht", activate: false, setScreen, value: 0 },
    { name: "Zusammenfassung", activate: false, setScreen, value: 1 },
    { name: "Checkout", activate: true },
  ];

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="my-page order-next-page">
        {/* <button
          className="bck-btn"
          style={{
            backgroundColor: getThemeContent().color,
          }}
          onClick={previous}
        >
          Zurück zum Warenkorb
        </button> */}
        <Formik
          initialValues={{
            notes: "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                <div className="d-flex mb-1">
                  <h1 className="mb-0">
                    <b>Checkout</b>
                  </h1>
                </div>

                {buttonLoading ? (
                  <button
                    type="submit"
                    className="order-next-page-btn text-capitalize"
                    onClick={() => {
                      handleSubmit(formik);
                    }}
                  >
                    Bestellung absenden
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="order-next-page-btn btn-disabled text-capitalize"
                  >
                    Bestellung absenden
                  </button>
                )}
              </div>
              <Row>
                <Col lg={9}>
                  <p className="checkout-heading mt-2">
                    Bitte geben Sie den Umfang der gesamten Abholung an.
                    Außerdem können Sie Tauschverpackungen anfordern sowie
                    alternative Ansprechpartner zur Abholung angeben.
                  </p>
                </Col>
                <Col lg={3} className="ps-2">
                  <div className="chckbx chckbx1 position-relative mb-3">
                    <p
                      className="mb-0 mt-3"
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Abholbereit
                    </p>
                    <div className="my-checkbox d-flex">
                      <div className="mt-1">
                        <input
                          type="checkbox"
                          checked={isReadyForPickUp}
                          onChange={(e) => handleChange(e, "isReadyForPickUp")}
                        />
                      </div>
                      <label
                        style={{
                          fontWeight: "normal",
                          fontSize: "12px",
                        }}
                      >
                        Hiermit wird bestätigt, dass die komplette Abholung
                        ordnungsgemäß und transportgerecht verpackt sowie
                        korrekt gekennzeichnet ist (Aufkleber).
                      </label>
                    </div>
                    <div className="my-checkbox d-flex">
                      <div className="mt-1">
                        <img src="/assets/icons/file.png" alt="file" />
                      </div>
                      <label
                        style={{
                          fontWeight: "normal",
                          fontSize: "12px",
                          marginTop: "10px",
                        }}
                      >
                        <b className="text-decoration-underline mt-4">
                          <a
                            href="/assets/BMW_Guideline_Werkstattentsorgung.pdf"
                            target="_blank"
                            style={{
                              color: "initial",
                            }}
                          >
                            BMW Händler Leitfaden herunterladen
                          </a>
                        </b>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="checkout-form">
                <Row>
                  <Col lg={6}>
                    <div className="chckbx chckbx1 position-relative mb-3">
                      <p>Umfang der gesamten Abholung:</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    {packagingList?.map((item, i) => (
                      <React.Fragment key={i}>
                        {i === 0 && (
                          <p className="Anzahl">
                            Verpackung auswählen: <br /> {""}
                          </p>
                        )}
                        <Dropdown
                          width="100%"
                          list={dashboardData?.checkOutPackagingType}
                          onChange={(e) => handleChange(e, "packagingType", i)}
                          value={item.packagingTypeId}
                        />
                      </React.Fragment>
                    ))}
                  </Col>
                  <Col lg={3}>
                    {packagingList?.map((item, i) => (
                      <React.Fragment key={i}>
                        {i === 0 && <p className="Anzahl">Anzahl auswählen:</p>}
                        <Dropdown
                          width="100%"
                          list={numbersList}
                          onChange={(e) => handleChange(e, "numbers", i)}
                          value={item.count}
                          numbers={true}
                        />
                      </React.Fragment>
                    ))}
                  </Col>
                  <Col lg={4} className="right-dropdown">
                    {packagingList?.map((item, i) => (
                      <React.Fragment key={i}>
                        {i === 0 && (
                          <p className="mb-0">
                            Gesamte Höhe dieser Einheit in cm (max. 160cm
                            Ausnahme: die Verpackung selbst hat andere
                            Beschränkungen):{" "}
                          </p>
                        )}
                        <input
                          className="custom-input"
                          type="number"
                          onChange={(e) => handleChange(e, "totalHeight", i)}
                          value={item.hieghtInCm}
                          min={0}
                          style={{
                            visibility:
                              item?.packagingTypeId ===
                                "bc315c0e-29c1-4758-8489-8a066eaf4675" &&
                              "hidden",
                          }}
                        />
                      </React.Fragment>
                    ))}
                    <p
                      className="mt-2 ms-5"
                      onClick={addNewPackageType}
                      style={{
                        cursor: "pointer",
                        fontWeight: "normal",
                      }}
                    >
                      <img src="/assets/icons/add-more.png" alt="more" />{" "}
                      <span className="text-decoration-underline">
                        weitere Verpackungsart hinzufügen
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="chckbx chckbx2 position-relative mb-3">
                      <p>Ersatzverpackung bei Abholung</p>
                      <CheckBox
                        label="Tausch benötigt"
                        checked={isSwapNeeded}
                        onChange={(e) => handleChange(e, "isSwapNeeded")}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={`${!isSwapNeeded && "disabled-item"}`}>
                  <Col lg={3}>
                    {replacementPackaging?.map((item, i) => (
                      <React.Fragment key={i}>
                        {i === 0 && (
                          <p className="mb-0">Verpackung auswählen:</p>
                        )}
                        <Dropdown
                          width="100%"
                          list={dashboardData?.checkOutPackagingType}
                          onChange={(e) =>
                            handleChange(e, "packagingType", i, "replacement")
                          }
                          value={item.packagingTypeId}
                        />
                      </React.Fragment>
                    ))}
                  </Col>
                  <Col lg={3}>
                    {replacementPackaging?.map((item, i) => (
                      <React.Fragment key={i}>
                        {i === 0 && <p className="mb-0">Anzahl auswählen:</p>}
                        <Dropdown
                          width="100%"
                          list={numbersList}
                          onChange={(e) =>
                            handleChange(e, "numbers", i, "replacement")
                          }
                          numbers={true}
                        />
                      </React.Fragment>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col lg={7}>
                    <div className="chckbx chckbx3 position-relative">
                      <p>Alternativer Ansprechpartner vor Ort</p>
                      <div className="my-checkbox d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            checked={isContactPerson}
                            onChange={(e) => handleChange(e, "isContactPerson")}
                          />
                          <label>
                            Sollte bei Ihnen ein alternativer Ansprechpartner
                            vor Ort für die Abholung zuständig sein,
                            <br />
                            geben Sie bitte hier eine mögliche Telefonnummer an.
                            Der Ansprechpartner muss ADR-geschult und
                            unterschriftenberechtigt sein.
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ width: "55%" }}
                      className={`${!isContactPerson && "disabled-item"}`}
                    >
                      <TextField
                        formik={formik}
                        type="text"
                        name="notes"
                        padding="1rem 0.5rem"
                        marginTop="0.1rem"
                        onKeyDown={(evt) =>
                          ![
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "+",
                          ].includes(evt.key) && evt.preventDefault()
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={2}></Col>
                  <Col lg={3}>
                    <div className="chckbx chckbx3 position-relative">
                      <label>Kommentar / Notiz hinzufügen</label>
                      <textarea
                        style={{
                          width: "100%",
                          height: "100px",
                          border: "1px solid #024a96",
                        }}
                        value={notes}
                        onChange={(e) => setnotes(e.target.value)}
                        type="text"
                        maxLength={300}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="txt-field1">
                  <Col
                    lg={4}
                    className={`${!isContactPerson && "disabled-item"}`}
                  ></Col>
                </Row>
              </div>
            </Form>
          )}
        </Formik>
        <Toaster />
      </div>
    </>
  );
};
CheckOut.propTypes = {
  setScreen: PropTypes.any,
};
export default CheckOut;
