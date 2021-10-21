import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Typography } from '@material-ui/core';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const payload = {
    "categoryList": [
        {
            "_id": "1",
            "name": "ajay",
            "children": [
                {
                    "_id": "2",
                    "name": "anuj",
                    "children": []
                }
            ]
        },
        {
            "_id": "3",
            "name": "sahu",
            "children": [
                {
                    "_id": "4",
                    "name": "don",
                    "children": []
                }
            ]
        },
    ]
}


const Test = (props) => {

    const [checked,setChecked] = useState([]);
    const [expanded,setExpanded] = useState([]);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    return (
        <Layout>
            <CheckboxTree
                nodes={renderCategories(payload.categoryList)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                    check: <IoIosCheckbox />,
                    uncheck: <IoIosCheckboxOutline />,
                    halfCheck: <IoIosCheckboxOutline />,
                    expandClose: <IoIosArrowForward />,
                    expandOpen: <IoIosArrowDown />,
                }}
            />
            <ul>
                
            </ul>
        </Layout>
    );
}

export default Test















