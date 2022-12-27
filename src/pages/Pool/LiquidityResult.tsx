/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
import { Trans } from '@lingui/macro'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import RangeBadge from 'components/Badge/RangeBadge'
import { ButtonPrimary } from 'components/Button'
import { LightCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { Break } from 'components/earn/styled'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import { RowBetween, RowFixed } from 'components/Row'
import { useToken } from 'hooks/Tokens'
import moment from 'moment'
import React from 'react'
import { PaperPosition } from 'state/paperPosition/reducer'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

const HoverText = styled(ThemedText.DeprecatedMain)`
  text-decoration: none;
  color: ${({ theme }) => theme.deprecated_text3};
  transition: all 0.2s ease;
  cursor: pointer;
  width: 80px;
  :hover {
    color: ${({ theme }) => theme.deprecated_text1};
    text-decoration: none;
  }
`

type Props = {
  paperPosition: PaperPosition,
  feeValueUpper: CurrencyAmount<Currency>,
  feeValueLower: CurrencyAmount<Currency>,
  handleBack: () => void
}

const LiquidityResult: React.FC<Props> = ({ paperPosition, feeValueLower, feeValueUpper, handleBack }) => {
  const token0 = useToken(paperPosition.token0)
  const token1 = useToken(paperPosition.token1)

  return (
    <AutoColumn gap="md" style={{ marginTop: '0.5rem', width: 500 }}>
      <div onClick={handleBack}>
        <HoverText>
          <Trans>← Back</Trans>
        </HoverText>
      </div>
      <RowBetween style={{ marginBottom: '0.5rem' }}>
        <RowFixed>
          <DoubleCurrencyLogo
            currency0={token0!}
            currency1={token1!}
            size={24}
            margin={true}
          />
          <ThemedText.DeprecatedLabel ml="10px" fontSize="24px">
            {token0!.symbol} / {token1!.symbol}
          </ThemedText.DeprecatedLabel>
        </RowFixed>
        <RangeBadge removed={false} inRange={true} />
      </RowBetween>

      <LightCard>
        <AutoColumn gap="md">
          <RowBetween>
            <RowFixed>
              <CurrencyLogo currency={token0} />
              <ThemedText.DeprecatedLabel ml="8px">{token0!.symbol}</ThemedText.DeprecatedLabel>
            </RowFixed>
            <RowFixed>
              <ThemedText.DeprecatedLabel mr="8px">{paperPosition.amount0}</ThemedText.DeprecatedLabel>
            </RowFixed>
          </RowBetween>
          <RowBetween>
            <RowFixed>
              <CurrencyLogo currency={token1} />
              <ThemedText.DeprecatedLabel ml="8px">{token1!.symbol}</ThemedText.DeprecatedLabel>
            </RowFixed>
            <RowFixed>
              <ThemedText.DeprecatedLabel mr="8px">{paperPosition.amount1}</ThemedText.DeprecatedLabel>
            </RowFixed>
          </RowBetween>
          <Break />
          <RowBetween>
            <ThemedText.DeprecatedLabel>
              <Trans>Fee Tier</Trans>
            </ThemedText.DeprecatedLabel>
            <ThemedText.DeprecatedLabel>
              <Trans>{paperPosition.feeTier / 10000}%</Trans>
            </ThemedText.DeprecatedLabel>
          </RowBetween>
        </AutoColumn>
      </LightCard>

      <AutoColumn gap="md">
        <RowBetween>
          <ThemedText.DeprecatedMain>Earned Reward in {moment(paperPosition.timeAdded).fromNow().replace(' ago', '')}</ThemedText.DeprecatedMain>
        </RowBetween>

        <RowBetween>
          <LightCard width="48%" padding="8px">
            <AutoColumn gap="4px" justify="center">
              <ThemedText.DeprecatedMain fontSize="12px">
                <Trans>{feeValueLower!.currency.symbol}</Trans>
              </ThemedText.DeprecatedMain>
              <ThemedText.DeprecatedMediumHeader textAlign="center">{feeValueLower ? formatCurrencyAmount(feeValueLower, 4) : '-'}</ThemedText.DeprecatedMediumHeader>
            </AutoColumn>
          </LightCard>

          <LightCard width="48%" padding="8px">
            <AutoColumn gap="4px" justify="center">
              <ThemedText.DeprecatedMain fontSize="12px">
                <Trans>{feeValueUpper!.currency.symbol}</Trans>
              </ThemedText.DeprecatedMain>
              <ThemedText.DeprecatedMediumHeader textAlign="center">{feeValueUpper ? formatCurrencyAmount(feeValueUpper, 4) : '-'}</ThemedText.DeprecatedMediumHeader>
            </AutoColumn>
          </LightCard>
        </RowBetween>
            <ButtonPrimary
              // width="fit-content"
              padding="6px 8px"
              $borderRadius="12px"
              onClick={() => {
                console.log('removing')
              }}
            >
              <Trans>Remove</Trans>
            </ButtonPrimary>
      </AutoColumn>
    </AutoColumn>
  )
}

export default LiquidityResult