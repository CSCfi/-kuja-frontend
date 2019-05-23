import React, { useState } from "react";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import WizardPage from "./WizardPage";
import DialogContent from "@material-ui/core/DialogContent";
import MuutospyyntoWizardMuutokset from "./MuutospyyntoWizardMuutokset";
import { KoulutuksetProvider } from "context/koulutuksetContext";
import { KoulutusalatProvider } from "context/koulutusalatContext";
import { KoulutustyypitProvider } from "context/koulutustyypitContext";
import Loading from "modules/Loading";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {
  ContentContainer,
  ContentWrapper,
  MessageWrapper
} from "modules/elements";
import { WizardWrapper, WizardContent } from "./MuutospyyntoWizardComponents";
import { ROLE_KAYTTAJA } from "modules/constants";
import {
  HAKEMUS_VIRHE,
  HAKEMUS_VIESTI,
  HAKEMUS_OTSIKOT
} from "../modules/uusiHakemusFormConstants";
import { MuutoshakemusProvider } from "context/muutoshakemusContext";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

Modal.setAppElement("#root");

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  button: {
    // marginRight: theme.spacing.unit
  },
  instructions: {
    // marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit
  }
}));

function getSteps() {
  return [
    HAKEMUS_OTSIKOT.MUUTOKSET.FI,
    HAKEMUS_OTSIKOT.PERUSTELUT.FI,
    HAKEMUS_OTSIKOT.EDELLYTYKSET.FI,
    HAKEMUS_OTSIKOT.YHTEENVETO.FI
  ];
}

const MuutospyyntoWizard = props => {
  const classes = useStyles();
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [state] = useState({
    isHelpVisible: false
  });
  const steps = getSteps();

  const handleNext = pageNumber => {
    if (pageNumber !== 4) {
      props.history.push(String(pageNumber + 1));
    }
  };

  const previousPage = pageNumber => {
    if (pageNumber !== 1) {
      props.history.push(String(pageNumber - 1));
    }
  };

  const onCancel = event => {
    if (event) {
      event.preventDefault();
    }
    const url = `/jarjestajat/${props.match.params.ytunnus}`;
    props.history.push(url);
  };

  const onSubmit = data => {
    // props.createMuutospyynto(data); // from EDIT form
  };

  const save = data => {
    if (props.match.params.uuid) {
      // props.saveMuutospyynto(data);
      // saveMuutospyynto(data);
    } else {
      const url = `/jarjestajat/${props.match.params.ytunnus}`;
      props.saveMuutospyynto(data).then(() => {
        let uuid = undefined;

        if (props.muutospyynto.save.data.data)
          uuid = props.muutospyynto.save.data.data.uuid;
        let newurl = url + "/hakemukset-ja-paatokset/" + uuid;
        props.history.push(newurl);
      });
    }
  };

  const update = data => {
    // props.updateMuutospyynto(data);
    // updateMuutospyynto(data);
  };

  const create = data => {
    return props.saveMuutospyynto(data).then(() => {
      let uuid = undefined;
      if (props.muutospyynto.save.data.data) {
        uuid = props.muutospyynto.save.data.data.uuid;
        const url = `/jarjestajat/${props.match.params.ytunnus}`;
        props.createMuutospyynto(uuid).then(() => {
          let newurl = url + "/hakemukset-ja-paatokset/";
          props.history.push(newurl);
        });
      }
    });
  };

  const preview = (event, data) => {
    event.preventDefault();
    props.previewMuutospyynto(data).then(() => {
      var binaryData = [];
      binaryData.push(props.muutospyynto.pdf.data);
      const data = window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/pdf" })
      );
      //const data =  window.URL.createObjectURL(response.data)
      var link = document.createElement("a");
      link.href = data;
      link.download = "file.pdf";
      link.click();
      // For Firefox it is necessary to delay revoking the ObjectURL
      setTimeout(window.URL.revokeObjectURL(data), 100);
    });
  };

  const openCancelModal = () => {
    setIsConfirmDialogVisible(true);
  };

  function handleCancel() {
    setIsConfirmDialogVisible(false);
  }

  function handleOk() {
    props.history.push(`/jarjestajat/${props.match.params.ytunnus}`);
  }

  const {
    muutosperustelut,
    vankilat,
    ELYkeskukset,
    lupa,
    paatoskierrokset,
    muutospyynto,
    initialValues
  } = props;
  const page = parseInt(props.match.params.page, 10);

  if (sessionStorage.getItem("role") !== ROLE_KAYTTAJA) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIESTI.KIRJAUTUMINEN.FI}</h3>
      </MessageWrapper>
    );
  }

  // TODO: organisaation oid pitää tarkastaa jotain muuta kautta kuin voimassaolevasta luvasta
  const jarjestajaOid =
    props.lupa && props.lupa.data ? props.lupa.data.jarjestajaOid : null;
  if (sessionStorage.getItem("oid") !== jarjestajaOid) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.OIKEUS.FI}</h3>
      </MessageWrapper>
    );
  }

  if (
    // muutosperustelut.fetched &&
    // vankilat.fetched &&
    // ELYkeskukset.fetched &&
    lupa.fetched
    // paatoskierrokset.fetched &&
    // (!muutospyynto || muutospyynto.fetched)
  ) {
    // muutospyynto.fetched is from EDIT FORM
    return (
      <React.Fragment>
        <Dialog
          open={true}
          onClose={openCancelModal}
          maxWidth={false}
          fullWidth={true}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="customized-dialog-title" onClose={openCancelModal}>
            {HAKEMUS_OTSIKOT.UUSI_MUUTOSHAKEMUS.FI}
          </DialogTitle>
          <DialogContent>
            <MuutoshakemusProvider>
              <div className={classes.root}>
                <Stepper activeStep={page - 1}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <ContentWrapper>
                  <WizardWrapper>
                    <ContentContainer
                      maxWidth="1085px"
                      margin={
                        state.isHelpVisible
                          ? "50px auto 50px 20vw"
                          : "50px auto"
                      }
                    >
                      <WizardContent>
                        {page === 1 && (
                          <WizardPage
                            pageNumber={1}
                            onNext={handleNext}
                            onSave={save}
                            render={props => (
                              <KoulutustyypitProvider>
                                <KoulutusalatProvider>
                                  <KoulutuksetProvider>
                                    <MuutospyyntoWizardMuutokset
                                      onCancel={onCancel}
                                      update={update}
                                      lupa={lupa}
                                      initialValues={initialValues}
                                      {...props}
                                    />
                                  </KoulutuksetProvider>
                                </KoulutusalatProvider>
                              </KoulutustyypitProvider>
                            )}
                          />
                        )}
                      </WizardContent>
                    </ContentContainer>
                  </WizardWrapper>
                </ContentWrapper>
              </div>
            </MuutoshakemusProvider>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isConfirmDialogVisible}
          maxWidth={false}
          fullWidth={true}
          aria-labelledby="confirm-dialog"
          maxWidth="sm"
        >
          <DialogTitle id="confirm-dialog">Poistutaanko?</DialogTitle>
          <DialogContent>{HAKEMUS_VIESTI.VARMISTUS.FI}</DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              {HAKEMUS_VIESTI.EI.FI}
            </Button>
            <Button onClick={handleOk} color="primary">
              {HAKEMUS_VIESTI.KYLLA.FI}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  } else if (
    // muutosperustelut.isFetching ||
    // vankilat.isFetching ||
    // ELYkeskukset.isFetching ||
    lupa.isFetching
    // paatoskierrokset.isFetching ||
    // !muutospyynto ||
    // muutospyynto.isFetching
  ) {
    // muutospyynto.isFetching is from EDIT form
    return <Loading />;
  } else if (muutosperustelut.hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HEADER.FI}</h3>
        {HAKEMUS_VIRHE.PERUSTELU.FI}
      </MessageWrapper>
    );
  } else if (vankilat.hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HEADER.FI}</h3>
        {HAKEMUS_VIRHE.VANKILA.FI}
      </MessageWrapper>
    );
  } else if (ELYkeskukset.hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HEADER.FI}</h3>
        {HAKEMUS_VIRHE.ELY.FI}
      </MessageWrapper>
    );
  } else if (paatoskierrokset.hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HEADER.FI}</h3>
        {HAKEMUS_VIRHE.PAATOSKIERROS.FI}
      </MessageWrapper>
    );
  } else if (muutospyynto.hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HEADER.FI}</h3>
        {HAKEMUS_VIRHE.MUUTOSPYYNTO.FI}
      </MessageWrapper>
    );
  } else if (lupa.hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HEADER.FI}</h3>
        {HAKEMUS_VIRHE.LUVANLATAUS.FI}
      </MessageWrapper>
    );
  } else {
    return null;
  }
};

export default MuutospyyntoWizard;
