import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import WizardPage from "./WizardPage";
import DialogContent from '@material-ui/core/DialogContent';
import MuutospyyntoWizardMuutokset from "./MuutospyyntoWizardMuutokset";
// import MuutospyyntoWizardPerustelut from "./MuutospyyntoWizardPerustelut";
// import MuutospyyntoWizardTaloudelliset from "./MuutospyyntoWizardTaloudelliset";
// import MuutospyyntoWizardYhteenveto from "./MuutospyyntoWizardYhteenveto";
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
  WizardTop,
  WizardWrapper,
  WizardHeader,
  WizardContent,
  Container
} from "./MuutospyyntoWizardComponents";
import { COLORS } from "modules/styles";
import close from "static/images/close-x.svg";
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

const CloseButton = styled.img`
  height: 20px;
  cursor: pointer;
`;

const PhaseStyle = styled.div`
  display: flex;
  align-items: baseline;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const Circle = styled.div`
  background: ${props =>
    props.active ? COLORS.OIVA_GREEN : COLORS.LIGHT_GRAY};
  color: ${COLORS.WHITE};
  height: 27px;
  width: 27px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const Text = styled.div`
  color: ${props => (props.active ? COLORS.BLACK : "rgb(96, 96, 96)")};
`;

const HideFooter = styled.div`
  background-color: white;
  width: 100%;
  position: relative;
  bottom: -100px;
  height: 100px;
`;
const Help = styled.div`
  background-color: #fffff0;
  border: 1px solid #afafa0;
  width: 20vw;
  min-width: 300px;
  position: fixed;
  top: 120px;
  min-height: 200px;
  max-height: 90vh;
  right: 20px;
  z-index: 100;
  opacity: 0.9;
  cursor: move;
  padding: 10px 20px;
  overflow-y: auto;
  overflow-x: wrap;

  h3 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Phase = ({ number, text, activePage, disabled, handleClick }) => {
  const isActive = Number(number) === Number(activePage);

  return (
    <PhaseStyle
      disabled={disabled}
      onClick={disabled ? null : () => handleClick(Number(number))}
    >
      <Circle active={isActive}>{number}</Circle>
      <Text active={isActive}>{text}</Text>
    </PhaseStyle>
  );
};

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

  const changePhase = number => {
    setState({ page: number });
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
  const { visitedPages } = state;
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
                <WizardHeader>
                  <Container maxWidth="1085px" color={COLORS.BLACK}>
                    <Phase
                      number="1"
                      text={HAKEMUS_OTSIKOT.MUUTOKSET.FI}
                      activePage={page}
                      handleClick={number => changePhase(number)}
                    />
                    <Phase
                      number="2"
                      text={HAKEMUS_OTSIKOT.PERUSTELUT.FI}
                      activePage={page}
                      disabled={visitedPages.indexOf(2) === -1}
                      handleClick={number => changePhase(number)}
                    />
                    <Phase
                      number="3"
                      text={HAKEMUS_OTSIKOT.EDELLYTYKSET.FI}
                      activePage={page}
                      disabled={visitedPages.indexOf(3) === -1}
                      handleClick={number => changePhase(number)}
                    />
                    <Phase
                      number="4"
                      text={HAKEMUS_OTSIKOT.YHTEENVETO.FI}
                      activePage={page}
                      disabled={visitedPages.indexOf(4) === -1}
                      handleClick={number => changePhase(number)}
                    />
                  </Container>
                </WizardHeader>

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
                    {/* {page === 2 && (
                  <WizardPage
                    pageNumber={2}
                    onPrev={previousPage}
                    onNext={nextPage}
                    onSave={save}
                    render={props => (
                      <MuutospyyntoWizardPerustelut
                        onCancel={onCancel}
                        muutosperustelut={props.muutosperustelut.data}
                        vankilat={props.vankilat.data}
                        ELYkeskukset={props.ELYkeskukset.data}
                        {...props}
                      />
                    )}
                  />
                )}
                {page === 3 && (
                  <WizardPage
                    pageNumber={3}
                    onPrev={previousPage}
                    onNext={nextPage}
                    onSave={save}
                    render={props => (
                      <MuutospyyntoWizardTaloudelliset
                        onCancel={onCancel}
                        initialValues={initialValues}
                        {...props}
                      />
                    )}
                  />
                )}
                {page === 4 && (
                  <WizardPage
                    pageNumber={4}
                    onPrev={previousPage}
                    onSave={save}
                    render={props => (
                      <MuutospyyntoWizardYhteenveto
                        onCancel={onCancel}
                        preview={preview}
                        initialValues={initialValues}
                        createMuutospyynto={create}
                        {...props}
                      />
                    )}
                  />
                )} */}
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
