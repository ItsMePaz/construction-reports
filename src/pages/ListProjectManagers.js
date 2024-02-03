import React, { useEffect, useState } from "react";
import ReactTablesPMList from "../views/Tables/ReactTablesPMList";
import { generateClient } from "aws-amplify/api";
import * as queries from "../graphql/queries";
import getCurrentUserDetails from "../services/getCurrentUserDetails";

//This component returns a list of PMs under the current PIC
const ListProjectManagers = () => {
  const [listOfPms, setListOfPms] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const getListOfPms = async () => {
    try {
      const currentPICUserID = await getCurrentUserDetails.getUserObjectId();
      // Fetch the Project Managers (PMs) using the PIC id
      const pmsResponse = await generateClient().graphql({
        query: queries.listProjectManagers,
        variables: {
          filter: {
            personInChargeProjectManagersId: {
              contains: currentPICUserID || null,
            },
          },
        },
        authMode: "userPool",
      });

      const pmsObject = pmsResponse.data.listProjectManagers.items;

      setListOfPms(pmsObject.map((obj) => Object.values(obj)));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getListOfPms();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  useEffect(() => {
    if (listOfPms.length > 0) {
      setShowTable(true);
    }
  }, [listOfPms, isUpdated]);

  return (
    <div>
      {listOfPms.length !== 0 ? (
        <ReactTablesPMList
          pmData={listOfPms || null}
          setIsUpdated={setIsUpdated}
          isUpdated={isUpdated}
        />
      ) : (
        <h1>No project managers added yet</h1>
      )}
    </div>
  );
};

export default ListProjectManagers;
