import React, { useState } from "react";
import Modal from "react-modal";

import WizardPage from "./WizardPage";
import DialogContent from '@material-ui/core/DialogContent';
import MuutospyyntoWizardMuutokset from "./MuutospyyntoWizardMuutokset";
import { KoulutuksetProvider } from "context/koulutuksetContext";
import { KoulutusalatProvider } from "context/koulutusalatContext";
import { KoulutustyypitProvider } from "context/koulutustyypitContext";
import Loading from "modules/Loading";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  ContentContainer,
  ContentWrapper,
  MessageWrapper
} from "modules/elements";
import {
  WizardWrapper,
  WizardContent,
} from "./MuutospyyntoWizardComponents";
import { ROLE_KAYTTAJA } from "modules/constants";
import {
  modalStyles,
  ModalButton,
  ModalText,
  Content
} from "./ModalComponents";
import {
  HAKEMUS_VIRHE,
  HAKEMUS_VIESTI,
  HAKEMUS_OTSIKOT
} from "../modules/uusiHakemusFormConstants";
// import {
//   getJarjestajaData,
//   loadFormData
// } from "services/muutospyynnot/muutospyyntoUtil";
import { MuutoshakemusProvider } from "context/muutoshakemusContext";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

Modal.setAppElement("#root");

const MuutospyyntoWizard = props => {
  const [state, setState] = useState({
    page: 1,
    visitedPages: [1],
    isCloseModalOpen: false,
    showHelp: true
  });

  const nextPage = pageNumber => {
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

  const openCancelModal = e => {
    e.preventDefault();
    setState({ isCloseModalOpen: true });
  };

  const afterOpenCancelModal = () => {};

  const closeCancelModal = () => {
    setState({ isCloseModalOpen: false });
  };

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
            <ContentWrapper>
              <WizardWrapper>
                <ContentContainer
                  maxWidth="1085px"
                  margin={state.showHelp ? "50px auto 50px 20vw" : "50px auto"}
                >
                  <WizardContent>
                    {page === 1 && (
                      <WizardPage
                        pageNumber={1}
                        onNext={nextPage}
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

              <Modal
                isOpen={state.isCloseModalOpen}
                onAfterOpen={afterOpenCancelModal}
                onRequestClose={closeCancelModal}
                contentLabel={HAKEMUS_VIESTI.VARMISTUS_HEADER.FI}
                style={modalStyles}
              >
                <Content>
                  <ModalText>{HAKEMUS_VIESTI.VARMISTUS.FI}</ModalText>
                </Content>
                <div>
                  <ModalButton primary onClick={onCancel}>
                    {HAKEMUS_VIESTI.KYLLA.FI}
                  </ModalButton>
                  <ModalButton onClick={closeCancelModal}>
                    {HAKEMUS_VIESTI.EI.FI}
                  </ModalButton>
                </div>
              </Modal>
            </ContentWrapper>
          </MuutoshakemusProvider>
        </DialogContent>
      </Dialog>
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
