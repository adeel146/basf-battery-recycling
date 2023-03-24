export const packagingForm = (props) => {
  return [
    {
      id: 1,
      name: "Name",
      value: props?.categoryName ? props?.categoryName : "-",
    },
    {
      id: 2,
      name: "Beschreibung",
      value: props?.description ? props?.description : "-",
    },

    {
      id: 3,
      name: "Maße Länge x Breite [mm]",
      value: props?.dimensions ? props?.dimensions : "-",
    },
    {
      id: 4,
      name: "Traglast [kg]",
      value: props?.weight ? props?.weight : "-",
    },

    {
      id: 5,
      name: "Preis",
      value: props?.price ? props?.price : "-",
    },
  ];
};
export const batteryForm = (props) => {
  return [
    {
      id: 1,
      name: "BMW/MINI/RR Teile-Nr. (AW)",
      value: props?.itemNumber ? props?.itemNumber : "-",
    },
    {
      id: 2,
      name: "Batterie verbaut in",
      value: props?.productUsed ? props?.productUsed : "-",
    },

    {
      id: 5,
      name: "Kategorie",
      value: props?.categoryName ? props?.categoryName : "-",
    },
    {
      id: 6,
      name: "Zellchemie",
      value: props?.cellChemistry ? props?.cellChemistry : "-",
    },

    {
      id: 12,
      name: "Spannung [V]",
      value: props?.voltageRange ? props?.voltageRange : "-",
    },
    {
      id: 13,
      name: "Kapazität [Ah]",
      value: props?.capacity ? props?.capacity : "-",
    },
    {
      id: 14,
      name: "Max. Leistung [kW]",
      value: props?.maxPower ? props?.maxPower : "-",
    },
    {
      id: 15,
      name: "Netto Gewicht [kg]",
      value: props?.weight ? props?.weight : "-",
    },
    {
      id: 16,
      name: "Maße Länge x Breite x Höhe [mm]",
      value: props?.dimensions ? props?.dimensions : "-",
    },
  ];
};
export const batteryForm2 = [
  {
    formikName: "PartNo",
    id: 1,
    name: "BMW/MINI/RR Teile-Nr. (AW)*",
  },
  {
    formikName: "BatteryInstalled",
    id: 2,
    name: "Batterie verbaut in",
  },

  {
    formikName: "Category",
    id: 5,
    name: "Kategorie",
  },
  {
    formikName: "CellChemistry",
    id: 6,
    name: "Zellchemie",
  },

  {
    formikName: "Voltage",
    id: 12,
    name: "Spannung [V]",
  },
  {
    formikName: "Capacity",
    id: 13,
    name: "Kapazität [Ah]",
  },
  {
    formikName: "MaxPower",
    id: 14,
    name: "Max. Leistung [kW]",
  },
  {
    formikName: "NetWeight",
    id: 15,
    name: "Netto Gewicht [kg]*",
  },

  {
    formikName: "Dimensions",
    id: 16,
    name: "Maße Länge x Breite x Höhe [mm]",
  },
];

export const getThemeContent = () => {
  let service = localStorage.getItem("serviceType");
  let obj = {
    bgColor: "blue-side-bar",
    color: "#024A96",
    brandIcon: "brand.png",
    cartIcon: "cart.svg",
    batteryCollectionModal: false,
    searchIcon: "search.png",
    orderBg: "order-bg.png",
  };
  if (service?.length > 0 && service !== "pickUp") {
    obj.bgColor = "orange-side-bar";
    obj.color = "#f39500";
    obj.brandIcon = "brand-orange.png";
    obj.cartIcon = "cart-orange.png";
    obj.batteryCollectionModal = true;
    obj.searchIcon = "search-black.png";
    obj.orderBg = "order-bg-orange.png";
  }
  return obj;
};

export const getServiceType = () => {
  return localStorage.getItem("serviceType");
};

export const GermanDateFormat = (datestr) => {
  let date = new Date(datestr);
  let date2 =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return date2;
};
