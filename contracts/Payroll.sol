// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.25;

contract Payroll {

    //takes the list of adresses and reads from the transaction,
    // this is the public finction that can be called outside (i.e on a back-end)
    function send(address payable[] calldata payees, 
    uint[] calldata amounts
    ) external payable {
        
        require (
            // bascically an if/else statement which throws an error is there is mismatch between number of payees (recepients)
            // and payments
            payees.length == amounts.length,
            "Number of payees should match the number of payment amounts"
        );

        for (uint i = 0; i < payees.length; i++){
            payees[i].call{value: amounts[i]}(""); 
        }

    } 

} 