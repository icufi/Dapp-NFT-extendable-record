import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';

import diagram from '../assets/images/diagrammodemaker.svg';
import simpleRecord from '../assets/images/simpleRecord.svg';

import theme from '../Styles';

const ModeMaker = () => {
  return (
    <Container>
      <Grid
        direction='column'
        alignItems='center'
        justifyContent='center'
        xs={12}
        container
      >
        <Grid
          xs={12}
          sx={{ mt: { xs: theme.spacing(4), md: theme.spacing(16) } }}
          item
        >
          <Typography sx={{ fontSize: '48px' }} variant='h1'>
            <strong>NFT Modes</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        direction='row'
        alignItems='center'
        justifyContent='center'
        xs={12}
        sx={{ mt: theme.spacing(10), mb: theme.spacing(6) }}
        container
      >
        <Grid xs={12} md={6} container>
          <Grid xs={12} item>
            <Typography variant='h4'>
              <strong>Artists earn money</strong>
            </Typography>
            <Box>
              <ul>
                <li>earn 3 Matic each time a mode your created mints</li>
                <li>Matic is Polygon blockchain currency</li>
              </ul>
            </Box>
            <Typography variant='h4'>
              <strong>What's an NFT mode?</strong>
            </Typography>
            <Box>
              <ul>
                <li>it's a visual "frame" around an existing NFT</li>
                <li>it may include a message written by the NFT owner</li>
                <li>modes frame NFTs for specific contexts</li>
                <li>modes make NFTs more useful</li>
                <li>modes are minted to become NFTs themselves</li>
              </ul>
            </Box>
            <Typography variant='h4'>
              <strong>What can your mode add to an existing NFT?</strong>
            </Typography>
            <Box>
              <ul>
                <li>contextual relevance</li>
                <li>feeling</li>
                <li>art</li>
                <li>character</li>
              </ul>
            </Box>
            <Typography variant='h4'>
              <strong>How do you get paid?</strong>
            </Typography>
            <Box>
              <ul>
                <li>
                  you will be paid in Matic sent to your wallet address on
                  Polygon
                </li>
                <li>
                  payments are made every Sunday for sales in the previous
                  period
                </li>
                <li>Metamask supports Polygon</li>
                <li>
                  <a
                    href='https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
                    target='blank'
                  >
                    Set up Metamask for Polygon
                  </a>
                </li>
              </ul>
            </Box>
            <Box sx={{ mt: theme.spacing(6) }}>
              <strong>Mode Submissions</strong>
              <ul>
                <li>
                  send submissions to:{' '}
                  <a href='mailto:modes@visible.love'>modes@visible.love</a>
                </li>
                <li>we will not accept all modes submitted</li>
                <li>make sure to include the specs below</li>
                <li>experimentation is welcome</li>
                <li>
                  Good modes should make existing NFTs more meaningful and
                  useful in different contexts.
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
        <Grid sx={{ mt: theme.spacing(0) }} xs={12} md={6} item>
          <img
            src={simpleRecord}
            alt='example NFT record'
            title='Sample Record'
          />
        </Grid>
      </Grid>
      <Grid
        direction='row'
        alignItems='center'
        justifyContent='center'
        xs={12}
        spacing={3}
        container
      >
        <Grid
          sx={{ mt: theme.spacing(2) }}
          xs={12}

          item
        >
          <Typography
            sx={{
              mt: theme.spacing(8),
              mb: theme.spacing(6),
              pl: theme.spacing(3),
              fontSize: '36px',
            }}
            variant='h4'
          >
            <strong>Required Specs</strong>
          </Typography>
          <Box>
            <strong>Format</strong>
            <ul>
              <li>SVG</li>
              <li>size, layout and dimensions are up to you</li>
              <li>art/design is up to you</li>
            </ul>
          </Box>
          <Grid xs={12} md={6} item>
            <img
              src={diagram}
              alt='example NFT record'
              title='exapmle NFT Record Diagram'
            />
          </Grid>

          <Box>
            <strong>A. Owners NFT</strong>
            <ul>
              <li>
                your mode should work with images from a specific NFT project
              </li>
              <li>
                format your mode with original NFT image dimensions in mind. for
                example BAYC images are square (631px by 631px)
              </li>
            </ul>
          </Box>
          <Box>
            <strong>B. Header</strong>
            <ul>
              <li>font, font size, placement is up to you</li>
              <li>
                outline the header text so the font renders accurately across
                systems
              </li>
            </ul>
          </Box>
          <Box>
            <strong>C. Owner Message</strong>
            <ul>
              <li>modes store up to 200 character messages on-chain</li>
              <li>
                your SVG should have 4 text tag areas of 50 characters each
              </li>
              <li>fill text tags with dummy text. do not outline this text</li>
              <li>font size, placement is up to you</li>
            </ul>
          </Box>
          <Box>
            <strong>D. Provenance Stack Header</strong>
            <ul>
              <li>your mode should include a "Provenance Stack" header</li>
              <li>
                outline this text so it renders consistently across systems{' '}
              </li>
              <li>font, font size, placement is up to you</li>
            </ul>
          </Box>
          <Box>
            <strong>E. Provenance Stack</strong>
            <ul>
              <li>include four text tag areas</li>
              <li>format them in a similar manner as the example</li>
              <li>do not outline this text</li>
              <li>font size is up to you</li>
            </ul>
          </Box>
          <Box>
            <strong>F. Record Description</strong>
            <ul>
              <li>your mode should include this record description</li>
              <li>font and font size is up to you</li>
              <li>do outline this text</li>
            </ul>
          </Box>
          <Box>
            <strong>Licensing of Artwork</strong>
            <ul>
              <li>
                all modes and artwork minted on Visible are licensced creative
                commons{' '}
                <a
                  href='https://creativecommons.org/publicdomain/zero/1.0/'
                  target='blank'
                >
                  CC0 1.0
                </a>
              </li>
              <li>
                you acknowledge this prior to sending us your
                artwork/mode/submission
              </li>
              <li>
                once a customer mints a record with your artwork/mode, that
                record, NFT and anything derivative belongs to the customer
                outright with no residual ownership, rights, or commission
                retained by Visible or the mode artist (you)
              </li>
              <li>
                if at any time you want your modes removed from Visible, we will
                do so at your request
              </li>
              <li>
                we cannot remove from any blockchain nor will we have any
                control over modes/artwork that have already been minted prior
                to your art's removal from Visible
              </li>
            </ul>
          </Box>
          <Typography sx={{ mt: theme.spacing(4) }} variant='h4'>
            <strong>Questions?</strong>
          </Typography>
          <Box sx={{ mt: theme.spacing(2) }}>
            Get in touch at{' '}
            <a href='mailto:modes@visible.love'>modes@visible.love</a>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ModeMaker;
