import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import * as R from "ramda";
import ContentEditable from "react-contenteditable";
import { FaTimes, FaLock, FaUnlock, FaDownload } from "react-icons/fa";
import common from "../../../i18n/definitions/common";
import { injectIntl } from "react-intl";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withStyles, IconButton } from "@material-ui/core";
import Tooltip from "../Tooltip";
import { downloadFileFn } from "../../../utils/common";
import _ from "lodash";

const alter = R.curry((id, value, path, items) =>
  R.map(R.when(R.propEq("id", id), R.assocPath(path, value)), items)
);

const StyledToggleButton = withStyles({
  root: {
    width: "3em",
    height: "3em",
    marginTop: "0.5em",
    marginBottom: "0.5em",
    "&.Mui-selected": {
      color: "red"
    }
  }
})(ToggleButton);

// 'mimeTypes' => array('image/jpeg', 'image/png','image/jpg','application/vnd.ms-excel',
// 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/docx',
// 'application/pdf','text/plain','application/msword',
// 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const defaultProps = {
  acceptedTypes: [
    "image/*",
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  isReadOnly: false,
  minSize: 0,
  maxSize: 26214400 // 1MB = 1048576
};

const FileUpload = ({
  acceptedTypes = defaultProps.acceptedTypes,
  intl,
  isReadOnly,
  minSize = defaultProps.minSize,
  maxSize = defaultProps.maxSize,
  onChanges,
  payload,
  uploadedFiles = []
}) => {
  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const files = R.concat(
          uploadedFiles,
          R.map(file => {
            const liite = {
              tiedostoId: Math.random() + "-" + file.name,
              filename: file.name,
              kieli: "fi", // Hard coded... but why?
              name: file.name,
              nimi: R.toLower(
                R.slice(0, R.lastIndexOf(".", file.name), file.name)
              ),
              tiedosto: new Blob([file]),
              koko: file.size,
              size: file.size,
              tyyppi: R.slice(
                R.lastIndexOf(".", file.name) + 1,
                Infinity,
                file.name
              ),
              type: file.type,
              removed: false,
              salainen: false,
              new: true
            };
            return {
              file: liite,
              id: Math.random()
            };
          }, acceptedFiles)
        );
        onChanges(payload, {
          files
        });
      }
    },
    [onChanges, payload, uploadedFiles]
  );

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    rejectedFiles
  } = useDropzone({
    accept: acceptedTypes,
    minSize,
    maxSize,
    onDrop
  });

  function handleFileRename(e, id) {
    const files = alter(id, e.target.value, ["file", "nimi"], uploadedFiles);
    onChanges(payload, {
      files: alter(id, e.target.value, ["file", "nimi"], uploadedFiles)
    });
  }

  const renamingDelayed = _.debounce(handleFileRename, 300);

  function togglePublicity(id, newValue) {
    onChanges(payload, {
      files: alter(id, newValue, ["file", "salainen"], uploadedFiles)
    });
  }

  function removeFile(id) {
    onChanges(payload, {
      files: R.filter(
        R.compose(R.not, R.equals(id), R.prop("id")),
        uploadedFiles
      )
    });
  }

  function downloadFile(file) {
    const fileToDownload = file.uuid
      ? { ...file, url: `/liitteet/${file.uuid}/raw` }
      : file;
    downloadFileFn(fileToDownload)();
  }

  const hasFilesWithUUID = useMemo(() => {
    return (
      R.filter(({ file }) => {
        return file.uuid || false;
      }, uploadedFiles).length > 0
    );
  }, [uploadedFiles]);

  return (
    <div>
      {!isReadOnly && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="h-20 cursor-pointer flex flex-col justify-center items-center border border-dashed border-gray-600">
            {isDragActive ? (
              <p>Pudota tiedostot tähän ...</p>
            ) : (
              <React.Fragment>
                <p>
                  Voit raahata tiedostot tähän tai klikata aluetta lisätäksesi
                  liitteitä.
                </p>
                {uploadedFiles.length > 0 && <p>Liitteet näkyvät alla.</p>}
              </React.Fragment>
            )}
          </div>
        </div>
      )}
      <ul className="mt-4">
        {uploadedFiles.length > 0 && (
          <li className="flex font-bold">
            <span
              className={`${hasFilesWithUUID ? "w-5/12" : "w-6/12"} "pr-2"`}>
              Nimi{" "}
              {!isReadOnly && (
                <span className="font-normal">(muokattavissa)</span>
              )}
            </span>
            <span className="w-2/12">Tyyppi</span>
            <span className="w-2/12">Koko</span>
            {!isReadOnly && (
              <span
                className={`${
                  hasFilesWithUUID ? "w-3/12" : "w-2/12"
                } text-center`}>
                Toiminnot
              </span>
            )}
          </li>
        )}
        {R.map(({ file, id }) => {
          return (
            <li
              key={`file-${id}`}
              className={`${
                isReadOnly ? "py-4" : ""
              } border-t border-gray-400`}>
              <span className="flex items-center">
                <span className={`${file.uuid ? "w-5/12" : "w-6/12"} "pr-2"`}>
                  {isReadOnly ? (
                    file.nimi
                  ) : (
                    <ContentEditable
                      html={file.nimi} // innerHTML of the editable div
                      disabled={false} // use true to disable edition
                      onChange={e => renamingDelayed(e, id)} // handle innerHTML change
                      tagName="span"
                    />
                  )}
                </span>
                <span className="w-2/12 break-words">{file.tyyppi}</span>
                <span className="w-2/12">{Math.round(file.size) / 100} KB</span>
                {file.uuid && (
                  <span className="w-1/12 text-center">
                    <Tooltip
                      placement="left"
                      tooltip="Tallenna liite koneellesi">
                      <IconButton
                        variant="contained"
                        size="small"
                        onClick={() => downloadFile(file)}>
                        <FaDownload />
                      </IconButton>
                    </Tooltip>
                  </span>
                )}
                {!isReadOnly && (
                  <span className="w-1/12 text-center">
                    <Tooltip
                      placement="bottom"
                      tooltip={
                        file.salainen
                          ? intl.formatMessage(common.attachmentSecretUnselect)
                          : intl.formatMessage(common.attachmentSecretSelect)
                      }>
                      <StyledToggleButton
                        value="check"
                        selected={file.salainen}
                        size="small"
                        onChange={() => {
                          togglePublicity(id, !!!file.salainen);
                        }}
                        title={
                          file.salainen
                            ? intl.formatMessage(
                                common.attachmentSecretUnselect
                              )
                            : intl.formatMessage(common.attachmentSecretSelect)
                        }>
                        {!file.salainen ? <FaUnlock /> : <FaLock />}
                      </StyledToggleButton>
                    </Tooltip>
                  </span>
                )}
                {!isReadOnly && (
                  <span className="w-1/12 text-center">
                    <Tooltip
                      placement="right"
                      tooltip="Poista liite hakemukselta">
                      <IconButton
                        variant="contained"
                        size="small"
                        onClick={() => removeFile(id)}>
                        <FaTimes />
                      </IconButton>
                    </Tooltip>
                  </span>
                )}
              </span>
            </li>
          );
        }, uploadedFiles)}
      </ul>
      {rejectedFiles.length > 0 && (
        <div>
          <span className="text-red-600">
            {rejectedFiles.length === 1 &&
              `Tiedosto oli ${rejectedFiles[0].name} liian suuri ladattavaksi.`}
            {rejectedFiles.length > 1 &&
              "Osa tiedostoista oli liian suuria ladattaviksi."}{" "}
            Suurin sallittu tiedostokoko on {(0.0009765625 / 1000) * maxSize}{" "}
            MB.
          </span>
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  isReadOnly: PropTypes.bool,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  acceptedTypes: PropTypes.array,
  onChanges: PropTypes.func.isRequired,
  payload: PropTypes.object,
  uploadedFiles: PropTypes.array
};

export default injectIntl(FileUpload);
