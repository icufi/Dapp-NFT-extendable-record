import * as React from 'react';
import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginTop: theme.spacing(3),
  background: 'transparent',
  border: `0px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1.4rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .00)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    // marginLeft: theme.spacing(6),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(),
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container sx={{ marginTop: 15 }}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ fontSize: '42px' }} variant='h4'>
                What is an NFT Mode?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ marginBottom: '1rem' }}>
                <strong>
                  Modes are on-chain records created for existing NFTs.
                </strong>
                <ul>
                  <li>Only an NFT owner can make a new mode.</li>
                  {/* <li>Send an email with verified NFT ownership records.</li> */}
                  <li>
                    Use modes to build a real life provenance for your NFT.
                  </li>
                  <li>
                    Use the right mode in a specific context to make your NFT more useful and meaningful.
                  </li>
                  <li>Modes are transferable ERC-721 NFTs.</li>
                  <li>You own your NFT's modes.</li>
                  <li>
                    Modes can be sold or traded on marketplaces like Opensea.
                  </li>
                  <li>Modes have on-chain metadata.</li>
                  <li>Modes can cannot be altered once created.</li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel5'}
            onChange={handleChange('panel5')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ fontSize: '42px' }} variant='h4'>
                Pricing
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <strong>Mode Pricing</strong>
                <ul>
                  <li>Modes are ERC-721 NFTs.</li>
                  <li>
                    Price to mint 1 mode is 6 Matic each plus transaction costs
                    (pennies on Polygon).
                  </li>
                  <li>
                    You must own 1 Builder Token at your address before minting
                    any modes.
                  </li>
                  <li>
                    Owning 1 Builder Token grants access to all services on
                    Visible.
                  </li>
                </ul>
                <strong>Builder Token Pricing</strong>
                <ul>
                  <li>Builder Tokens are ERC-721 NFTs.</li>
                  <li>Builder Tokens are 60 Matic each.</li>
                  <li>
                    You will be prompted to purchase a Builder Token before
                    minting your first mode.
                  </li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ fontSize: '42px' }} variant='h4'>
                NFT Owner Verification
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <strong>
                  Stronger NFT provenance is Visible's most important service.
                </strong>
                <ul>
                  <li>
                    Only a verified owner address can make a mode for an NFT.
                  </li>
                  <li>
                    Owner verification is achieved through layering calls to NFT
                    source contracts.
                  </li>
                </ul>
              </Box>
              <Box>
                <strong>
                  NFT ownership is checked on-chain 3 times during new record
                  creation.
                </strong>
                <ol>
                  <li>
                    The first check occurs before a new record preview is
                    generated.
                  </li>
                  <li>The second check occurs prior to mode creation.</li>
                  <li>The third check occurs after new record creation.</li>
                  <li>
                    If any of these checks fail, the new record will not be
                    generated or accessible.
                  </li>
                  <li>
                    After NFT ownership is verified, your NFT's new mode is
                    unalterable, freely accessible and transferable.
                  </li>
                </ol>
              </Box>
              <Box>
                <strong>Security</strong>
                <ul>
                  <li>
                    Users are <strong>never</strong> asked to sign any
                    transaction to prove ownership.
                  </li>
                  <li>
                    The only transaction that takes place during record creation
                    is an NFT mint transaction on an ERC-721 contract.
                  </li>
                  <li>
                    As an added level of security for Ethereum NFT owners, new
                    records are minted on the Polygon blockchain.
                  </li>
                  <li>
                    Transactions on Polygon cannot affect the security of NFTs
                    on Ethereum.
                  </li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ fontSize: '42px' }} variant='h4'>
                About Polygon?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <strong>Metamask supports Polygon</strong>
                <ul>
                  <li>
                    Set up:{' '}
                    <a
                      href='https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
                      target='blank'
                    >
                      Metamask for Polygon
                    </a>
                    .
                  </li>
                  <li>Polygon uses a currency called Matic. </li>
                  <li>
                    <a
                      href='https://wallet.polygon.technology/login?next=%2Fbridge%2F'
                      target='blank'
                    >
                      Bridge (transfer) ETH to Matic Here
                    </a>
                  </li>
                  <li>
                    Learn:{' '}
                    <a
                      href='https://consensys.net/blog/metamask/how-to-bridge-tokens-from-ethereum-to-polygon-with-metamask/'
                      target='blank'
                    >
                      Bridging ETH to Matic
                    </a>
                    .
                  </li>
                </ul>
                <strong>What is Polygon?</strong>
                <ul>
                  <li>
                    Polygon was created to deliver Ethereum services at scale.
                  </li>
                  <li>Use Polygon exactly like Ethereum.</li>
                  <li>Polygon gas fees are pennies per transaction.</li>
                </ul>
                <strong>Why use Polygon?</strong>
                <ul>
                  <li>Affordable network transaction fees.</li>
                  <li>
                    Services with substantial data storage requirements (like
                    on-chain messages and metadata) are cost effective on
                    Polygon.
                  </li>
                  <li>
                    Like Ethereum NFTs, NFTs/modes minted on Polygon can be
                    traded at marketplaces like Opensea.
                  </li>

                  <li>Enhanced security for Etherum NFTs.</li>
                </ul>
                <strong>Security of your Ethereum NFTs.</strong>
                <ul>
                  <li>
                    Connecting your wallet while on Polygon cannot affect your
                    Ethereum NFTs.
                  </li>
                  <li>
                    Transactions while on Polygon cannot affect ownership of
                    Ethereum NFTs.
                  </li>
                  <li>
                    Creating new modes on Visible cannot affect the ownership of
                    existing NFT's.
                  </li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ fontSize: '42px' }} variant='h4'>
                Builder Tokens
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <strong>What are Builder Tokens?</strong>
                <ul>
                  <li>Builder Tokens are NFTs we've created.</li>
                  <li>
                    Owning 1 Builder Token grants access to all services on
                    Visible.
                  </li>
                  <li>Builder Tokens are available on Polygon.</li>
                  <li>
                    You will be prompted to purchase a Builder Token prior to
                    minting your first NFT mode.
                  </li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel6'}
            onChange={handleChange('panel6')}
          >
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ fontSize: '42px' }} variant='h4'>
                Who is Visible?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <strong>
                  We build services with love for NFT owners and artists.
                </strong>
                <ul>
                  <li>
                    We have a big expansive view of the long term importance of
                    NFTs.
                  </li>
                  <li>We think NFTs can build worlds.</li>
                  <li>We are working to find out how.</li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Container>
  );
}
