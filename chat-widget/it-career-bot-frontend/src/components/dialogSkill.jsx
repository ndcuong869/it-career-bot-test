import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import root_url from "../config";

const renderSkillItem = (skillName) => {
  return (
      <ListItem>
        <Checkbox color="primary"></Checkbox>
        <ListItemText>{skillName}</ListItemText>
      </ListItem>
  );
};

const renderGroupSkill = (groupName, skillList) => {
    return (
        <Grid item xs={12} md={6}>
            <Typography variant='h6'>{groupName}</Typography>
            <List>
                {skillList.map(item => {
                    return renderSkillItem(item)
                })}
            </List>
        </Grid>
    )
}

export default function DialogSkill({ isOpen, closeDialog}) {
  const [knowledge, setKnowledge] = useState([])
  const [technicalSkill, setTechnicalSkill] = useState([])
  const [technology, setTechnology] = useState([])

  console.log(technology)
  const renderActionButtons = () => {
    return (
      <>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button color="primary">Update</Button>
      </>
    );
  };

  useEffect(() => {
    const knowledge_temp = []
    const technical_skill_temp = []
    const tech_temp = []
    axios.get(root_url + "/api/skills").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].type === "Knowledge") {
          knowledge_temp.push(response.data[i].name)
        }
  
        if (response.data[i].type === "TechnicalSkill") {
          technical_skill_temp.push(response.data[i].name)
        }
  
        if (response.data[i].type === "Technology") {
          tech_temp.push(response.data[i].name)
        }
      }
    }).then(() => {
      setKnowledge(knowledge_temp)
      setTechnology(tech_temp)
      setTechnicalSkill(technical_skill_temp)
    })
  }, []) 

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={isOpen}
        aria-labelledby="simple-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add existed skills</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your existed skills to provide the best career path for you.
          </DialogContentText>
          <Grid container spacing={2}>
              {renderGroupSkill('Technical skill', technicalSkill)}
              {renderGroupSkill('Knowledge', knowledge)}
              {renderGroupSkill('Technology', technology)}
          </Grid>
        </DialogContent>
        <DialogActions>{renderActionButtons()}</DialogActions>
      </Dialog>
    </>
  );
}
