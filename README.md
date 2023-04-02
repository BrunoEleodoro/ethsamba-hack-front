# ethsamba-hack-front

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/BrunoEleodoro/ethsamba-hack-contracts/main/docs/Screenshot%202023-04-02%20at%2008.49.45.png" width="100%"/></td>
    <td><img src="https://raw.githubusercontent.com/BrunoEleodoro/ethsamba-hack-contracts/main/docs/Screenshot%202023-04-02%20at%2008.49.55.png" width="100%"/></td>
    <td><img src="https://raw.githubusercontent.com/BrunoEleodoro/ethsamba-hack-contracts/main/docs/Screenshot%202023-04-02%20at%2008.50.08.png" width="100%"/></td>
  </tr>
</table>

No Frontend utilizamos Reactjs, typescript e tailwindcss para fazer as paginas da aplicação.

Também foi necessario instalar as dependencias do SDK da Fuel:

```
"@fuel-wallet/sdk": "^0.7.1"
"fuels": "^0.37.1",
```

Com isso foi possivel interagir com os smart contracts, e esses metodos estao presentes nos seguintes arquivos:

- Query contracts, connect wallet 
    - https://github.com/BrunoEleodoro/ethsamba-hack-front/blob/main/src/App.tsx#L41-L54
- Hooks: 
    - https://github.com/BrunoEleodoro/ethsamba-hack-front/blob/main/src/hooks/useFuel.tsx
    - https://github.com/BrunoEleodoro/ethsamba-hack-front/blob/main/src/hooks/useIsConnected.tsx
- Send Transaction 
    - https://github.com/BrunoEleodoro/ethsamba-hack-front/blob/main/src/components/ReceiverReviewComponent.tsx#L21-L41
- Types of contracts: 
    - https://github.com/BrunoEleodoro/ethsamba-hack-front/tree/main/src/types
