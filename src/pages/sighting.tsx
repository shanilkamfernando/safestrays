import React, { useEffect, useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import "./sighting.css";
import {
  CalendarDaysIcon,
  ClockIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import markerImage from "../../public/images/marker.png";
import dogImage from "../../public/images/dog.jpeg";
import Image from "next/image";
import axios from "axios";

export default function Sighting() {
  const [latitude, setLatitude] = useState(Number);
  const [longitude, setLongitude] = useState(Number);

  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64 = event.target.result;
        setBase64Image(base64);
        setFormData({
          ...formData,
          ["photograpghs"]: base64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (fileInputRef: any) => {
    // Trigger a click event on the hidden file input when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    city: "",
    date: "",
    time: "",
    description: "",
    emergencyReporting: "",
    status: "",
    photograpghs: "",
    addiComments: "",
    lat: "",
    long: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Check if any field in formData is null or an empty string
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === null || value === ""
    );

    if (isAnyFieldEmpty) {
      //   // Show the error message
    } else {
      // Make a POST request to the API endpoint
      axios
        .post("http://localhost:5000/api/v1/reporting/", formData)
        .then((response: any) => {
          // Handle a successful response, if needed
          console.log("Data posted successfully:");
          window.location.reload();
          if (response.data.success) {
          } else {
          }
        })
        .catch((error: any) => {
          // Handle any errors
          console.error("Error posting data:", error);
        });
    }
    console.log("data", formData);
    console.log(base64Image);
  };

  useEffect(() => {
    if (latitude && longitude) {
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 15,
        }),
      });

      const marker = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });

      const iconStyle = new Icon({
        src: markerImage.src as string, // Use the imported marker image as the source
        anchor: [0.5, 1],
      });

      const style = new Style({
        image: iconStyle,
      });

      marker.setStyle(style);

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(vectorLayer);
    }
  }, [latitude, longitude]);

  const showlocation = () => {
    setLatitude(parseFloat(formData.lat));
    setLongitude(parseFloat(formData.long));
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to the API endpoint
    axios
      .get("http://localhost:5000/api/v1/getreporting/")
      .then((response) => {
        // Handle a successful response
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-end p-6 lg:px-8 text-white navbar"
          aria-label="Global"
        >
          <div className="hidden lg:flex lg:gap-x-12 mx-20">
            <a
              href="/"
              className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
            >
              HOME
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
            >
              OUR STORY
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
            >
              SUPPORT
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
            >
              PROFILE
            </a>
          </div>
        </nav>
      </header>

      <div className=" pt-24 pb-10 sm:py-20 mt-10">
        <div className="bg-white text-black flex flex-col justify-center pb-10">
          <div className="flex justify-center flex-col">
            <div className="text-[35px]  text-center tracking-[0px] border-b-2 border-black mx-[3rem] font-bold pb-5">
              Stray dog sighting and Health reporting
            </div>
            {/* <div className="border-b-2 border-black pt-7 w-[400px] pb-10 "></div> */}
          </div>
          <div className="text-black text-[16px] grid  grid-cols-1  lg:grid-cols-2 mt-10">
            <div className="pt-[2rem] mx-20 ">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Contact Number
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="contactNumber"
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      autoComplete="contactNumber"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="city"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Date and Time
                  </label>
                </div>
                <div className="grid grid-cols-4">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md col-span-3">
                    <input
                      type="text"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      autoComplete="date"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <CalendarDaysIcon
                    className="h-8 w-8 text-gray-500 ml-3"
                    aria-hidden="true"
                  />
                </div>

                <div className="grid grid-cols-4">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md col-span-3">
                    <input
                      type="text"
                      name="time"
                      id="time"
                      value={formData.time}
                      onChange={handleChange}
                      autoComplete="time"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <ClockIcon
                    className="h-8 w-8 text-gray-500 ml-3"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      autoComplete="description"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                </div>
                <div className="grid grid-cols-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ">
                    <input
                      type="text"
                      name="lat"
                      id="lat"
                      value={formData.lat}
                      onChange={handleChange}
                      autoComplete="lat"
                      placeholder="Latitude "
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ">
                    <input
                      type="text"
                      name="long"
                      id="long"
                      value={formData.long}
                      onChange={handleChange}
                      autoComplete="long"
                      placeholder="Longitude"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-2">
                <div></div>
                <div className="grid grid-cols-1">
                  <div>
                    <button
                      onClick={showlocation}
                      className="bg-black text-white text-center w-[90%] text-[14px] py-1 rounded-full"
                    >
                      {" "}
                      Show Location
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1"></div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Emergency Reporting
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="emergencyReporting"
                      id="emergencyReporting"
                      value={formData.emergencyReporting}
                      onChange={handleChange}
                      autoComplete="emergencyReporting"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Status
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleChange}
                      autoComplete="status"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Photographs
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="mt-0 flex justify-center rounded-lg border border-solid border-gray-900/25 py-2">
                    <div className="text-center">
                      <div className="mt-0 flex text-sm leading-0 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                    </div>
                  </div>
                  <div className="pb-3 ">
                    {base64Image ? (
                      <div className="w-50 mt-5">
                        <img src={base64Image} alt="Uploaded" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  {" "}
                  <label
                    htmlFor="username"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Additional Comments
                  </label>
                </div>
                <div className="col-span-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="addiComments"
                      id="addiComments"
                      value={formData.addiComments}
                      onChange={handleChange}
                      autoComplete="addiComments"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[2rem] mr-20">
              <div id="map" className="h-full w-full"></div>
              <div className="grid grid-cols-2 gap-0 mt-5">
                <div className="grid grid-cols-2 gap-0 mt-5"></div>
                <div className="grid grid-cols-2 gap-0 mt-5">
                  <button
                    onClick={handleSubmit}
                    className="bg-black text-white text-center  uppercase w-[90%] text-[14px] py-2 rounded-full"
                  >
                    Submit
                  </button>

                  <button className="bg-white text-black text-center uppercase w-[90%] text-[14px] py-2 rounded-full ring-1 ring-black">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col mx-20 py-10">
        <div className="text-[35px]  text-center tracking-[0px] border-b-2 border-black pb-10 font-bold mb-10">
          Stray dog sighting and Health reporting
        </div>
        {/* <div className="border-b-2 border-black pt-7 w-[400px] pb-10 "></div> */}

        <div className="flex justify-end">
          <div className="  border-[1px] border-black mr-10 tracking-widest w-[20%] flex justify-start bg-[#C4C4C454] py-2 px-10 rounded-full">
            Search
          </div>{" "}
          <div className="  border-[1px] border-black tracking-widest w-[15%] flex justify-center bg-white py-2 rounded-full">
            Filter
            <FunnelIcon
              className="h-6 w-6 text-black ml-3"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-3 sm:p-8 mt-10">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((dog: any) => (
              <div className="rounded-xl  shadow-lg" key={dog._id}>
                <div className="overflow-hidden rounded-lg h-36">
                  <Image
                    className="w-96 cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg h-auto"
                    src={dog.photograpghs}
                    alt={""}
                    width="100" // Set the desired width
                    height="100" // Set the desired height
                  />
                </div>
                <div className="p-6">
                  <p className="font-small text-gray-500 cursor-pointer text-md duration-300 transition mt-2">
                    {dog.time}
                  </p>
                  <h1 className="pt-5 text-[20px] font-large text-black block">
                    {dog.name}
                  </h1>
                  <p className="font-normal text-gray-500 cursor-pointer text-md duration-300 transition mt-2">
                    {dog.date}
                  </p>
                  <p className="font-normal text-black cursor-pointer text-md duration-300 transition mt-2">
                    {dog.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-black py-20 flex justify-center items-center flex-col text-white">
        <div className="tracking-[6px] uppercase">SafeStrays</div>
        <div className="leading-relaxed">copyright @ SafeStrays 2023</div>
      </div>
    </>
  );
}
