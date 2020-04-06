import React from "react";
import { Helmet } from "react-helmet";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import { ContentContainer } from "../../modules/elements";
import { Typography } from "@material-ui/core";

const Home = () => {
  return (
    <ContentContainer>
      <Helmet>
        <title>Oiva | Etusivu</title>
      </Helmet>
      <Typography component="h2" variant="h4" className="p-4">
        Oiva - Opetushallinnon ohjaus- ja säätelypalvelu
      </Typography>
      <Card className="p-4">
        <Typography paragraph={true}>
          Palvelusta löytyvät tällä hetkellä kaikki ajantasaiset ammatillisen
          koulutuksen järjestämisluvat sekä vapaan sivistystyön oppilaitosten
          ylläpitämisluvat. Myöhemmin Oiva laajennetaan koskemaan myös esi- ja
          perusopetuksen sekä lukiokoulutuksen järjestämisluvat. Palvelusta
          löytyy lisäksi väestö-, koulutus- ja lupatietoja ja erilaisia
          tilastoja ammatillisen koulutuksen osalta.
        </Typography>
        <Typography paragraph={true} variant="body2" className="py-4">
          <Link
            href="https://link.webropolsurveys.com/S/F156FEC089139BF4"
            color="inherit"
            target="_blank">
            Palautelomake
          </Link>
        </Typography>
      </Card>
    </ContentContainer>
  );
};

export default Home;
