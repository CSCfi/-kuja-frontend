import React, { useContext, useEffect, useCallback, useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import WizardPage from "./WizardPage";
import DialogContent from "@material-ui/core/DialogContent";
import MuutospyyntoWizardMuutokset from "./MuutospyyntoWizardMuutokset";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { MessageWrapper } from "modules/elements";
import { ROLE_KAYTTAJA } from "modules/constants";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import { MUUT_KEYS } from "../modules/constants";
import PropTypes from "prop-types";
import Loading from "../../../../../../modules/Loading";
import { KohteetContext } from "../../../../../../context/kohteetContext";
import { KoulutusalatContext } from "context/koulutusalatContext";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { KoulutustyypitContext } from "context/koulutustyypitContext";
import { KieletContext } from "../../../../../../context/kieletContext";
import { OpiskelijavuodetContext } from "../../../../../../context/opiskelijavuodetContext";
import { MuutContext } from "../../../../../../context/muutContext";
import { MaaraystyypitContext } from "../../../../../../context/maaraystyypitContext";
import { MuutoshakemusContext } from "../../../../../../context/muutoshakemusContext";
import { MuutospyynnotContext } from "../../../../../../context/muutospyynnotContext";
import {
  saveMuutospyynto,
  setBackendChanges,
  setSectionData
} from "../../../../../../services/muutoshakemus/actions";
import { createObjectToSave } from "../../../../../../services/muutoshakemus/utils/saving";
import { fetchKoulutusalat } from "services/koulutusalat/actions";
import { fetchMuut } from "../../../../../../services/muut/actions";
import {
  fetchKielet,
  fetchOppilaitoksenOpetuskielet
} from "../../../../../../services/kielet/actions";
import {
  fetchKoulutuksetAll,
  fetchKoulutuksetMuut,
  fetchKoulutus
} from "../../../../../../services/koulutukset/actions";
import { fetchKohteet } from "../../../../../../services/kohteet/actions";
import { fetchKoulutustyypit } from "services/koulutustyypit/actions";
import { fetchMuutospyynto } from "../../../../../../services/muutospyynnot/actions";
import { fetchMaaraystyypit } from "../../../../../../services/maaraystyypit/actions";
import { HAKEMUS_VIESTI } from "../modules/uusiHakemusFormConstants";
import { MuutoshakemusProvider } from "context/muutoshakemusContext";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { injectIntl } from "react-intl";
import * as R from "ramda";

import "react-toastify/dist/ReactToastify.css";
import MuutospyyntoWizardPerustelut from "./MuutospyyntoWizardPerustelut";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
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

const MuutospyyntoWizard = props => {
  const notify = (title, options) => {
    toast.success(title, options);
  };

  const { state: muutospyynnot, dispatch: muutospyynnotDispatch } = useContext(
    MuutospyynnotContext
  );
  const { state: muutoshakemus, dispatch: muutoshakemusDispatch } = useContext(
    MuutoshakemusContext
  );
  const { state: kohteet, dispatch: kohteetDispatch } = useContext(
    KohteetContext
  );
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );
  const { state: koulutusalat, dispatch: koulutusalatDispatch } = useContext(
    KoulutusalatContext
  );
  const { state: maaraystyypit, dispatch: maaraystyypitDispatch } = useContext(
    MaaraystyypitContext
  );
  const { state: opiskelijavuodet } = useContext(OpiskelijavuodetContext);
  const { state: muut, dispatch: muutDispatch } = useContext(MuutContext);
  const {
    state: koulutustyypit,
    dispatch: koulutustyypitDispatch
  } = useContext(KoulutustyypitContext);
  const { state: kielet, dispatch: kieletDispatch } = useContext(KieletContext);

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [state] = useState({
    isHelpVisible: false
  });
  const {
    intl: { formatMessage }
  } = props;
  const [steps, setSteps] = useState([]);
  const [lupa, setLupa] = useState({});
  const [page, setPage] = useState(1);
  const [accessRight, setAccessRight] = useState(false);

  useEffect(() => {
    setLupa(props.lupa);
    // TODO: organisaation oid pitää tarkastaa jotain muuta kautta kuin voimassaolevasta luvasta
    if (sessionStorage.getItem("oid") === props.lupa.data.jarjestajaOid) {
      setAccessRight(true);
    }
  }, [props.lupa]);

  useEffect(() => {
    fetchKohteet()(kohteetDispatch);
    fetchKoulutus("999901")(koulutuksetDispatch);
    fetchKoulutus("999903")(koulutuksetDispatch);
    fetchKoulutusalat()(koulutusalatDispatch);
    fetchKoulutustyypit()(koulutustyypitDispatch);
    fetchKoulutuksetMuut(MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS)(
      koulutuksetDispatch
    );
    fetchKoulutuksetMuut(MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS)(koulutuksetDispatch);
    fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS)(koulutuksetDispatch);
    fetchKielet(props.intl.locale)(kieletDispatch);
    fetchOppilaitoksenOpetuskielet()(kieletDispatch);
    fetchMaaraystyypit()(maaraystyypitDispatch);
    fetchMuut()(muutDispatch);
    const uuid = props.match.params.uuid;
    if (uuid) {
      fetchMuutospyynto(uuid)(muutospyynnotDispatch);
    }
  }, [
    kohteetDispatch,
    koulutuksetDispatch,
    koulutusalatDispatch,
    koulutustyypitDispatch,
    kieletDispatch,
    maaraystyypitDispatch,
    muutDispatch,
    muutospyynnotDispatch,
    props.intl.locale,
    props.match.params.uuid
  ]);

  useEffect(() => {
    if (koulutusalat.fetched && koulutustyypit.fetched) {
      fetchKoulutuksetAll(koulutusalat.data, koulutustyypit.data)(
        koulutuksetDispatch
      );
    }
  }, [koulutusalat, koulutustyypit, koulutuksetDispatch]);

  useEffect(() => {
    if (muutoshakemus.save && muutoshakemus.save.saved) {
      if (!props.match.params.uuid) {
        notify(
          "Muutospyyntö tallennettu! Voit jatkaa pian dokumentin muokkaamista.",
          {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT,
            type: toast.TYPE.SUCCESS
          }
        );
        const page = parseInt(props.match.params.page, 10);
        const url = `/jarjestajat/${props.match.params.ytunnus}`;
        const uuid = muutoshakemus.save.data.data.uuid;
        let newurl = url + "/hakemukset-ja-paatokset/" + uuid + "/" + page;
        setTimeout(() => {
          props.history.replace(newurl);
        });
      } else {
        notify("Muutospyyntö tallennettu!", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          type: toast.TYPE.SUCCESS
        });
      }
      muutoshakemus.save.saved = false; // TODO: Check if needs other state?
    }
  }, [muutoshakemus, props.history, props.match.params]);

  const handlePrev = pageNumber => {
    if (pageNumber !== 1) {
      props.history.push(String(pageNumber - 1));
    }
  };

  const handleNext = pageNumber => {
    if (pageNumber !== 4) {
      props.history.push(String(pageNumber + 1));
    }
  };

  useEffect(() => {
    setSteps([
      formatMessage(wizardMessages.pageTitle_1),
      formatMessage(wizardMessages.pageTitle_2),
      formatMessage(wizardMessages.pageTitle_3),
      formatMessage(wizardMessages.pageTitle_4)
    ]);
  }, [formatMessage]);

  /**
   * Let's walk through all the changes from the backend and update the muutoshakemus.
   */
  useEffect(() => {
    if (muutospyynnot.fetched) {
      const backendMuutokset = R.path(
        ["muutospyynto", "muutokset"],
        muutospyynnot
      );
      const categorize = changes => {
        const categorizedChanges = {};
        R.forEach(changeObj => {
          const areaCode = R.compose(
            R.view(R.lensIndex(0)),
            R.split(".")
          )(changeObj.anchor);
          if (!categorizedChanges[areaCode]) {
            categorizedChanges[areaCode] = [];
          }
          categorizedChanges[areaCode].push(changeObj);
        }, changes);
        return categorizedChanges;
      };
      const getChangesOf = (key, changes, path = ["kohde", "tunniste"]) => {
        let result = R.filter(R.pathEq(path, key))(changes);
        if (key === "tutkinnotjakoulutukset") {
          result = R.filter(
            R.compose(
              R.not,
              R.equals("tutkintokieli"),
              R.path(["meta", "tunniste"])
            ),
            result
          );
        }
        if (key !== "toimintaalue") {
          result = R.map(R.path(["meta", "changeObj"]))(result);
        }
        return result;
      };
      const changes = {
        tutkinnotjakoulutukset: getChangesOf(
          "tutkinnotjakoulutukset",
          backendMuutokset
        ),
        kielet: {
          opetuskielet: getChangesOf("opetuskieli", backendMuutokset, [
            "meta",
            "koulutusala"
          ]),
          tutkintokielet: categorize(
            getChangesOf("tutkintokieli", backendMuutokset, [
              "meta",
              "tunniste"
            ])
          )
        },
        opiskelijavuodet: getChangesOf("opiskelijavuodet", backendMuutokset),
        toimintaalue: getChangesOf("toimintaalue", backendMuutokset),
        muut: categorize(getChangesOf("muut", backendMuutokset)),
        handled: true
      };
      setBackendChanges(changes)(muutoshakemusDispatch);
    }
  }, [
    muutospyynnot,
    muutospyynnot.muutospyynto.muutokset,
    muutoshakemusDispatch
  ]);

  const save = () => {
    if (props.match.params.uuid) {
      saveMuutospyynto(
        createObjectToSave(
          lupa,
          muutoshakemus,
          props.match.params.uuid,
          muutospyynnot.muutospyynto
        )
      )(muutoshakemusDispatch);
    } else {
      saveMuutospyynto(createObjectToSave(lupa, muutoshakemus))(
        muutoshakemusDispatch
      );
    }
  };

  const setChangesBySection = useCallback(
    (sectionId, changes) => {
      setChangesBySection(sectionId, changes)(muutoshakemusDispatch);
    },
    [muutoshakemusDispatch]
  );

  const onUpdate = useCallback(
    payload => {
      setSectionData(payload)(muutoshakemusDispatch);
    },
    [muutoshakemusDispatch]
  );

  const openCancelModal = () => {
    setIsConfirmDialogVisible(true);
  };

  function handleCancel() {
    setIsConfirmDialogVisible(false);
  }

  function handleOk() {
    props.history.push(`/jarjestajat/${props.match.params.ytunnus}`);
  }

  useEffect(() => {
    setPage(parseInt(props.match.params.page, 10));
  }, [props.match.params.page]);

  if (sessionStorage.getItem("role") !== ROLE_KAYTTAJA) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIESTI.KIRJAUTUMINEN.FI}</h3>
      </MessageWrapper>
    );
  }

  if (
    (!props.match.params.uuid || muutospyynnot.fetched) &&
    muutoshakemus.backendChanges.handled &&
    kohteet.fetched &&
    kielet.fetched &&
    koulutukset.fetched &&
    koulutukset.muut.fetched.length === 3 &&
    koulutukset.poikkeukset.fetched.length === 2 &&
    koulutusalat.fetched &&
    koulutustyypit.fetched &&
    lupa.fetched &&
    maaraystyypit.fetched &&
    accessRight
  ) {
    return (
      <MuutoshakemusProvider>
        <Dialog
          open={true}
          onClose={openCancelModal}
          maxWidth={state.isHelpVisible ? "xl" : "lg"}
          fullScreen={true}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="customized-dialog-title" onClose={openCancelModal}>
            {formatMessage(wizardMessages.formTitle_new)}
          </DialogTitle>
          <DialogContent>
            <div className="lg:px-16 lg:py-4 max-w-6xl m-auto mb-10">
              <Stepper
                activeStep={page - 1}
                orientation={
                  window.innerWidth >= 768 ? "horizontal" : "vertical"
                }
              >
                {steps.map(label => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {page === 1 && (
                <WizardPage
                  pageNumber={1}
                  onNext={handleNext}
                  onSave={save}
                  lupa={lupa}
                  muutoshakemus={muutoshakemus}
                >
                  <MuutospyyntoWizardMuutokset
                    kielet={kielet}
                    kohteet={kohteet.data}
                    koulutukset={koulutukset}
                    koulutusalat={koulutusalat}
                    koulutustyypit={koulutustyypit}
                    lupa={lupa}
                    maaraystyypit={maaraystyypit.data}
                    muut={muut}
                    muutoshakemus={muutoshakemus}
                    onUpdate={onUpdate}
                    setChangesBySection={setChangesBySection}
                    opiskelijavuodet={opiskelijavuodet}
                  />
                </WizardPage>
              )}
              {page === 2 && (
                <WizardPage
                  pageNumber={2}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSave={save}
                  lupa={lupa}
                  muutoshakemus={muutoshakemus}
                >
                  <MuutospyyntoWizardPerustelut
                    kohteet={kohteet.data}
                    lupa={lupa}
                    muut={muut}
                    onUpdate={onUpdate}
                    muutoshakemus={muutoshakemus}
                  />
                </WizardPage>
              )}
              {page === 3 && (
                <WizardPage
                  pageNumber={3}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSave={save}
                  lupa={lupa}
                  muutoshakemus={muutoshakemus}
                />
              )}
              {page === 4 && (
                <WizardPage
                  pageNumber={4}
                  onPrev={handlePrev}
                  onSave={save}
                  lupa={lupa}
                  muutoshakemus={muutoshakemus}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isConfirmDialogVisible}
          fullWidth={true}
          aria-labelledby="confirm-dialog"
          maxWidth="sm"
        >
          <DialogTitle id="confirm-dialog">Poistutaanko?</DialogTitle>
          <DialogContent>{HAKEMUS_VIESTI.VARMISTUS.FI}</DialogContent>
          <DialogActions>
            <Button onClick={handleOk} color="primary" variant="contained">
              {HAKEMUS_VIESTI.KYLLA.FI}
            </Button>
            <Button onClick={handleCancel} color="secondary" variant="outlined">
              {HAKEMUS_VIESTI.EI.FI}
            </Button>
          </DialogActions>
        </Dialog>
      </MuutoshakemusProvider>
    );
  } else {
    return (
      <MessageWrapper>
        <Loading />
      </MessageWrapper>
    );
  }
};

MuutospyyntoWizard.propTypes = {
  lupa: PropTypes.object
};

export default injectIntl(MuutospyyntoWizard);
