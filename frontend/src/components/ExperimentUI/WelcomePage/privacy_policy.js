import React, { useState } from "react";
import { Button, Typography, Modal, Box, Card, CardContent } from "@mui/material";

const PrivacyPolicyModal = ({ isOpen, setIsOpen }) => {

    const handleClose = () => setIsOpen(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "10px",
    };

    return (
        <>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Card sx={{ maxHeight: 400, overflowY: "auto", borderRadius: "10px" }}>
                        <CardContent>
                            <Typography variant="body2" paragraph>
                                Data Controller Information
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Identity: The entity responsible for data collection and processing is Technical University of Chemnitz.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Contact Details: Participants can reach out for inquiries regarding data privacy at firdos-khatoon.khan@s2021.tu-chemnitz.de.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Purpose of Data Collection
                            </Typography>
                            <Typography variant="body2" paragraph>
                                The data collected during this experiment will be used solely for academic research purposes as part of a thesis project.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Types of Data Collected
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - No Personal Data: No personal information such as usernames or email addresses is collected in our Experiment in the further steps of this experiment, Please dont enter any information that is confidential to you. Eg: Email address or Phone number.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Interaction Data: Detailed records of user interactions with the chatbot, including text exchanges, responses, and navigation behavior within the experiment, will be collected.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Task Completion Data: Information on which tasks were completed by participants and the time taken to complete them will be recorded.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - User Feedback: Participants may be asked to provide feedback on their experience.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Legal Basis for Processing
                            </Typography>
                            <Typography variant="body2" paragraph>
                                The processing of data is based on the explicit consent provided by the participants prior to their involvement in the experiment.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Data Anonymization
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Alll collected data is anonymized to ensure that no personally identifiable information (PII) is linked to the dataset used for analysis.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Data Usage and Sharing
                            </Typography>
                            <Typography variant="body2" paragraph>
                                The collected data will be used strictly for the research objectives outlined in this thesis.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Data Storage and Security
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Data will be securely stored on encrypted servers provided by Firdos Khan for the Thesis work with TUC (Technical University of Chemnitz).
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Data Retention
                            </Typography>
                            <Typography variant="body2" paragraph>
                                The data will be retained for a period necessary to fulfill the research objectives.
                            </Typography>


                            <Typography variant="body2" paragraph>
                                - Right to Rectification: Participants can request corrections to any inaccurate or incomplete data.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Right to Erasure: Participants have the right to request the deletion of their data.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Right to Restrict Processing: Participants can request the limitation of data processing in certain circumstances.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                - Right to Data Portability: Participants have the right to receive their data in a structured, commonly used, and machine-readable format.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                - Right to Withdraw Consent: Participants can withdraw their consent at any time. Just dont start the Experiment.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Complaints
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Participants have the right to lodge a complaint with a supervisory authority if they believe their data has been mishandled.
                            </Typography>

                            <Typography variant="body2" paragraph>
                                Changes to the Privacy Policy
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Any changes to this privacy policy will be communicated to participants in advance.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleClose}
                        fullWidth
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default PrivacyPolicyModal;
