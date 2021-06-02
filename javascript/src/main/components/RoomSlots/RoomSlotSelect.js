import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { asHumanQuarter } from "main/utils/quarter";

import {
    quarterProvider as defaultQuarterProvider,
    roomSlotProvider as defaultRoomSlotProvider
  } from "main/services/selectorSupport"

  const selectorIndices = {
    QUARTER: 0,
    ROOM: 1
  };

export default function RoomSlotSelect(props){
    const {
        quarterProvider = defaultQuarterProvider,
        roomSlotProvider = defaultRoomSlotProvider,
        onChange,
        ...otherProps
      } = props;
    const [options, setOptions] = useState(null);

    const onCascaderChange = (value) => {
        onChange(value[selectorIndices.ROOM]);
      };
    
      useEffect(() => {
        quarterProvider()
          .then(quarters => {
            setOptions(quarters.map(q => ({
              value: q,
              label: asHumanQuarter(q),
              isLeaf: false
            })));
          })
      }, [quarterProvider]);

      const loadData = async selectedOptions => {
        if (selectedOptions.length === 1) {
          const selectedQuarter = selectedOptions[selectorIndices.QUARTER];
          selectedQuarter.loading = true;
    
        //   const courses = await courseProvider(selectedQuarter.value);
            const roomSlots = await roomSlotProvider();
          selectedQuarter.loading = false;
          selectedQuarter.children =
            roomSlots.map(r => ({
                value: r.id,
                label: r.location,
                isLeaf: true
            }));
        
        }
    
        setOptions([...options]); // force rerender
      }

      


    return (
        <Cascader
          {...otherProps}
          options={options}
          loadData={loadData}
          onChange={onCascaderChange}
          placeholder={options ? "Select a room slot" : "Loading..."}
          disabled={!options}
        />
      );
}