import React, { useCallback, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import DropzoneIcon from "../../assets/img/dropzone-icon.svg";

const dropzoneContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "350px",
  padding: "1rem",
  borderWidth: 2,
  borderRadius: 4,
  borderColor: "#58E997",
  borderStyle: "dashed",
  backgroundColor: "#FFFFFF",
  textAlign: "center",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#58E997",
};

const acceptStyle = {
  borderColor: "#FB8500",
};

const rejectStyle = {
  borderColor: "#E10050",
};

export interface CreateNFTCardImageProps {
  preview: string;
  filename: string;
  size: number;
  type: string;
  image: ArrayBuffer;
}

export interface CreateNFTCardProps {
  name: string;
  description: string;
  image?: CreateNFTCardImageProps;
  setImage: React.Dispatch<
    React.SetStateAction<CreateNFTCardImageProps | undefined>
  >;
}

export default function CreateNFTCard(props: CreateNFTCardProps) {
  const { enqueueSnackbar } = useSnackbar();

  const onDropAccepted = useCallback(
    (acceptedFiles: Array<File>) => {
      if (acceptedFiles.length !== 1) {
        enqueueSnackbar("Não foi possível carregar a imagem!", {
          variant: "error",
        });
        return;
      }
      const file = acceptedFiles[0];

      let reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = function () {
        const imageArrayBuffer = reader.result as ArrayBuffer;

        props.setImage({
          preview: URL.createObjectURL(file),
          filename: file.name,
          size: file.size,
          type: file.type,
          image: imageArrayBuffer,
        });
      };
    },
    [enqueueSnackbar, props]
  );

  useEffect(() => {
    if (props.image) {
      URL.revokeObjectURL(props.image.preview);
    }
  }, [props.image]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxSize: 5 * 1024 * 1024,
    onDropAccepted: onDropAccepted,
    multiple: false,
  });

  const style: DropzoneRootProps = useMemo(
    () => ({
      ...dropzoneContainerStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const removeImage = () => {
    props.setImage(undefined);
  };

  return (
    <Card
      sx={{
        marginRight: (theme) => theme.spacing(5),
        position: "sticky",
        top: 0,
      }}
    >
      {props.image && (
        <Box>
          <CardMedia
            component="img"
            image={props.image.preview}
            alt={props.image.filename}
            sx={{
              padding: (theme) => theme.spacing(2),
              paddingBottom: 0,
            }}
          />
          <div onClick={() => removeImage()}>
            <HighlightOffIcon
              sx={{
                position: "absolute",
                backgroundColor: "white",
                borderRadius: "50%",
                cursor: "pointer",
                fill: "#FB8500",
                top: (theme) => theme.spacing(1),
                right: (theme) => theme.spacing(1),
                zIndex: 2,
              }}
              fontSize="large"
            />
          </div>
        </Box>
      )}
      {!props.image && (
        <Box {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <img
            src={DropzoneIcon}
            alt="Arraste e solte a imagem NFT"
            height="48px"
            style={{ marginBottom: "1rem" }}
          />
          {!isDragActive && (
            <Typography>Arraste ou aperte para escolher uma imagem</Typography>
          )}
          {isDragAccept && (
            <Typography>Arraste a imagem e solte aqui</Typography>
          )}
          {isDragReject && <Typography>Arquivo não suportado</Typography>}
        </Box>
      )}
      {props.name && (
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
