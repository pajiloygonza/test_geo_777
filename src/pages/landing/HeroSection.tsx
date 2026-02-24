import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import DownloadIcon from "@mui/icons-material/Download";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import styled from "styled-components";
import { useGeo } from "../../entities/geo/useGeo";
import { useI18n } from "../../entities/i18n/useI18n";
import { GameOverlay } from "../../features/game/GameOverlay";
import { openInNewWindow } from "../../features/game/openInNewWindow";
import { useGameOverlay } from "../../features/game/useGameOverlay";
import { SelectControl } from "../../shared/ui/SelectControl";

const GAME_URL =
  "https://gateway.eva-digital-playground.com/v0/casino/games/launch?gameId=n2-novomatic-book-of-ra-deluxe&channel=desktop&partnerKey=0wl&lobbyUrl=https://chinchincasino.com&mode=demo&language=en";

const HeroRoot = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 30px;

  // &::before {
  //   content: "";
  //   position: absolute;
  //   inset: 0;
  // }
`;

const HeroContent = styled.div`
  position: relative;
  height: 100vh;
  min-height: 100vh;
  z-index: 1;
  width: 100%;
  max-width: 880px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    left: 58%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100vh;
    background-image: url("/img/background.png");
    background-size: cover;
    background-position: center -50px;
    background-repeat: no-repeat;
    z-index: -1;
    object-fit: cover;
    scale: 1.12;
  }
  @media (max-width: 480px) {
    &::before {
      scale: 1.2;
    }
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #02011f 60%, #06225d 100%);
  padding: 60px 30px 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterInner = styled.div`
  width: min(1920px, 100%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 1440px) {
    width: min(960px, 100%);
    display: grid;
    grid-template-areas:
      "card"
      "lang"
      "social"
      "badges";
    justify-items: center;
    justify-content: center;
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 44px;
  }
`;

const FooterPerson = styled.img`
  width: clamp(120px, 18vw, 230px);
  height: auto;
  filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.45));

  @media (min-width: 1920px) {
    width: 288px;
    height: 288px;
  }
  @media (max-width: 1920px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 1440px) {
    display: none;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 1440px) {
    display: contents;
  }
`;

const DownloadApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  max-width: 390px;
  height: 248px;
  padding: 20px;
  border-radius: 18px;
  border: 2px dashed rgba(255, 165, 70, 0.85);
  background: rgba(8, 10, 28, 0.7);
  text-align: center;

  @media (max-width: 1440px) {
    grid-area: card;
    max-width: 292px;
    height: auto;
  }
`;

const DownloadTitle = styled.div`
  font-size: 32px;
  font-weight: 800;
  font-family: Headline, sans-serif;
  color: #ffffff;
`;

const DownloadSubtitle = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.72);
  font-family: Headline, sans-serif;
`;

const DownloadButton = styled.button`
  margin-top: 8px;
  width: min(250px, 90%);
  height: 50px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(90deg, #ff8a3d, #ffc25d);
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.45);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  }

  @media(max-width: 480px) {
    height: 50px;
}
`;

const FooterCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  margin-left: 30px;

  @media (max-width: 1440px) {
    grid-area: badges;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 70px;
    margin-left: 0px;
    margin-top: 35px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 18px;
  }
  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const BadgeBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 320px;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 1440px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 220px;
  }
`;

const SocialBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  @media (max-width: 1440px) {
    grid-area: social;
    align-items: center;
    margin-top: 45px;
  }
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 137px;

  @media (max-width: 1440px) {
    display: contents;
  }
`;

const LanguageWrap = styled.div`
  width: min(300px, 90vw);

  @media (max-width: 1440px) {
    grid-area: lang;
    margin-top: 25px;
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

`;

const SocialIconButton = styled(IconButton)`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  box-shadow: 0 14px 24px rgba(0, 0, 0, 0.45);

  &:hover {
    filter: brightness(1.05);
  }
`;

export const HeroSection: React.FC = () => {
  const { geo, setGeo, config, allGeos } = useGeo();
  const { t, lang } = useI18n();
  const { isOpen, open, close } = useGameOverlay();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const geoOptions = useMemo(() => {
    return Object.values(allGeos).map((entry) => ({
      value: entry.code,
      label: entry.label,
    }));
  }, [allGeos]);

  const gameLangMap: Record<typeof lang, string> = {
    en: "en",
    cs: "cs",
    de: "de",
    es: "es",
    pl: "pl",
    uk: "uk",
  };

  const gameUrl = useMemo(() => {
    const url = new URL(GAME_URL);
    url.searchParams.set("language", gameLangMap[lang] ?? "en");
    return url.toString();
  }, [lang]);

  const handleOpenInNewWindow = () => {
    const ok = openInNewWindow(gameUrl);
    if (!ok) setSnackbarOpen(true);
  };

  return (
    <HeroRoot>
      <HeroContent>
        <Stack spacing={3} alignItems="center">
          <Box
            component="img"
            src="/img/logo.png"
            alt={t("alt.logo")}
            sx={{
              width: "min(60vw, 260px)",
              height: "auto",
              filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))",
            }}
          />

          <Box
            component="img"
            src="/img/slots.png"
            alt={t("alt.slots")}
            sx={{
              width: "min(80vw, 300px)",
              height: "auto",
              filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.4))",
            }}
          />

          <Stack
            spacing={1.5}
            alignItems="center"
            sx={{ width: "min(80vw, 292px)" }}
          >
            <Button
              variant="contained"
              onClick={open}
              sx={(theme) => ({
                fontSize: "16px",
                py: 1.5,
                width: "100%",
                background: `linear-gradient(90deg, ${theme.app.gradient.from}, ${theme.app.gradient.to})`,
                color: "white",
                textTransform: "uppercase",
                boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                "@media (max-width: 480px)": { width: "100%" },
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.app.gradient.to}, ${theme.app.gradient.from})`,
                },
              })}
            >
              {t("hero.ctaOpenGame")}
            </Button>
            <Button
              variant="text"
              onClick={handleOpenInNewWindow}
              sx={{ color: "rgba(255,255,255,0.75)" }}
            >
              {t("hero.ctaOpenInNewWindow")}
            </Button>
          </Stack>
        </Stack>
      </HeroContent>

      <Footer>
        <FooterInner>
          <FooterLeft>
            <FooterPerson src="/img/person.png" alt={t("alt.person")} />
            <DownloadApp>
              <Box
                component="img"
                src="/img/logo.png"
                alt={t("alt.logo")}
                sx={{
                  width: "175px",
                  height: "auto",
                  filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))",
                }}
              />
              <DownloadTitle>{t("footer.downloadTitle")}</DownloadTitle>
              <DownloadSubtitle>
                {t("footer.downloadSubtitle")}
              </DownloadSubtitle>
              <DownloadButton type="button">
                <DownloadIcon />
                {t("footer.downloadTitle")}
              </DownloadButton>
            </DownloadApp>
            <FooterCenter>
              <BadgeBlock>
                <Box
                  component="img"
                  src="/img/for_older.png"
                  alt={t("alt.age")}
                  sx={{ height: 56 }}
                />
                <Typography
                  sx={{ fontSize: 16, color: "rgba(255,255,255,0.75)" }}
                >
                  {t("footer.ageRestrictionText")}
                </Typography>
              </BadgeBlock>

              <BadgeBlock>
                <Box
                  component="img"
                  src="/img/licence.png"
                  alt={t("alt.licence")}
                  sx={{
                    height: 56
                  }}
                />
                <Typography
                  sx={{ fontSize: 16, color: "rgba(255,255,255,0.75)" }}
                >
                  {t("footer.certificationText")}
                </Typography>
              </BadgeBlock>
            </FooterCenter>
          </FooterLeft>

          <FooterRight>
            <LanguageWrap>
              <SelectControl
                id="geo-select"
                label={t("controls.geoLabel")}
                value={geo}
                options={geoOptions}
                onChange={setGeo}
              />
            </LanguageWrap>

            <SocialBlock>
              <Typography
                sx={{ fontSize: 16, color: "rgba(255,255,255,0.75)" }}
              >
                {t("footer.socialTitle")}
              </Typography>
              <SocialRow>
                <SocialIconButton
                  aria-label="Instagram"
                  style={{ border: "none" }}
                  sx={{
                    background:
                      "radial-gradient(circle at 90% 120%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
                  }}
                >
                  <InstagramIcon sx={{ fontSize: 34 }} />
                </SocialIconButton>
                <SocialIconButton
                  aria-label="Telegram"
                  sx={{ background: "#3a8dff" }}
                >
                  <TelegramIcon sx={{ fontSize: 34 }} />
                </SocialIconButton>
                <SocialIconButton aria-label="X" sx={{ background: "#0b0b0b" }}>
                  <XIcon sx={{ fontSize: 34 }} />
                </SocialIconButton>
                <SocialIconButton
                  aria-label="Email"
                  sx={{ background: "#0b0b0b" }}
                >
                  <MailOutlineIcon sx={{ fontSize: 34 }} />
                </SocialIconButton>
              </SocialRow>
            </SocialBlock>
          </FooterRight>
        </FooterInner>
      </Footer>

      <GameOverlay
        open={isOpen}
        onClose={close}
        url={gameUrl}
        closeLabel={t("hero.close")}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={t("hero.popupBlocked")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </HeroRoot>
  );
};
