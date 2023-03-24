import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Accordion, Col, Row, Table } from "react-bootstrap";
import { batteryForm } from "../../../assets/data/batteryForm";
import FilterCard from "../../../common/ui/FilterCard";
import ProgressSteps from "../../../common/ui/ProgressSteps";

const Assignments = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  
  const handleChange = (e, key) => {
    let value = e.target.value;
    if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
    }
  };
  const list = [
    {
      id: 1,
      name: "one",
      value: "value one",
    },
    {
      id: 2,
      name: "two",
      value: "value two",
    },
  ];
  return (
    <div className="my-page assignment-page">
      <h1>Aufträge</h1>
      <FilterCard
        handleChange={(e) => handleChange(e, "selectValue")}
        handleSearch={(e) => handleChange(e, "searchInput")}
        value={searchInput}
        dropdownValue={selectValue}
        list={list}
      />
      <Table
        responsive
        borderless
        className="table-data my-custom-table mt-5 table-data-blue"
      >
        <thead className="custom-table-head">
          <tr>
            <th>Auftragsnummer</th>
            <th>Erstellungsdatum</th>
            <th>Abholdatum</th>
            <th>Status</th>
            <th>Recycling-Zertifikat</th>
          </tr>
        </thead>
        <tbody className="custom-table-body">
          {[1, 2].map((item, index) => (
            <tr key={index}>
              <td colSpan={6} className="main-td">
                <Accordion defaultActiveKey="-111">
                  <Accordion.Item>
                    <Accordion.Header>
                      <Table borderless className="w-100 m-0">
                        <tbody>
                          <tr>
                            <td>#09876545</td>
                            <td>18.02.2022</td>
                            <td>N/A</td>
                            <td>
                              <img src="/assets/icons/save.png" alt="save" />
                            </td>
                            <td>
                              <img src="/assets/icons/save.png" alt="icon" />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Accordion.Header>
                    <Accordion.Body>
                      <>
                        <div className="accordion-details-card">
                          <ProgressSteps />
                          <Row>
                            <Col lg={12}>
                              {[0, 1].map((item, index) => (
                                <div key={index} className="left-side bg-white">
                                  <div className="head" />
                                  <div className="body">
                                    <Row>
                                      <Col xs={6} sm={6} md={6} lg={3}>
                                        <img
                                          src="/assets/images/details-image.png"
                                          alt="detail"
                                        />
                                        <div className="quantity-card d-flex">
                                          <div className="minus">
                                            <FontAwesomeIcon icon={faMinus} />
                                          </div>
                                          <div className="count">1</div>
                                          <div className="plus">
                                            <FontAwesomeIcon icon={faPlus} />
                                          </div>
                                        </div>
                                        <button className="card-link">
                                          Löschen
                                        </button>
                                        <br />
                                        <button className="card-link">
                                          Bearbeiten
                                        </button>
                                      </Col>
                                      <Col xs={6} sm={6} md={6} lg={3}>
                                        {batteryForm.slice(0, 6).map((item) => (
                                          <p className="m-0" key={item.id}>
                                            <b>{item.name}</b> {item.value}
                                          </p>
                                        ))}
                                      </Col>
                                      <Col xs={6} sm={6} md={6} lg={3}>
                                        {batteryForm.slice(0, 6).map((item) => (
                                          <p className="mb-0" key={item.id}>
                                            <b>{item.name}</b> {item.value}
                                          </p>
                                        ))}
                                      </Col>
                                      <Col xs={6} sm={12} md={6} lg={3}>
                                        {batteryForm.slice(0, 6).map((item) => (
                                          <p className="m-0 " key={item.id}>
                                            <b>{item.name}</b> {item.value}
                                          </p>
                                        ))}
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                              ))}
                            </Col>
                            {/* <Col lg={3}>
                              <div className="right-side bg-white h-100">
                                <h4>
                                  <b>Varpackung:</b>
                                </h4>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt
                                </p>
                                {[0, 0, 0].map((item, index) => (
                                  <div className="details" key={index}>
                                    <p>
                                      <b>Verpackungsarten</b> Pallete
                                    </p>
                                    <p>
                                      <b>Verpackungsarten</b> Pallete
                                    </p>
                                    <p>
                                      <b>Verpackungsarten</b> Pallete
                                    </p>
                                    <div className="custom-hr" />
                                  </div>
                                ))}
                              </div>
                            </Col> */}
                          </Row>
                        </div>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Assignments;
