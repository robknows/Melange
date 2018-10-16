// React
import React from 'react'
// Testing
import {mount, shallow} from 'enzyme'
// Main
import MultipleChoiceQuestion, {Choices} from '../main/MultipleChoiceQuestion'
// Enzyme react-adapter configuration & others
import {configureAdapter} from "./utils"

configureAdapter()

it('Shows the question of a translation question', () => {
    let q = {type: 1, question: "sounds like \"i\" in English", a: "ა", b: "ო", c: "უ", d: "ი", answer: Choices.D}
    let testMCQ = shallow(<MultipleChoiceQuestion q={q} />)

    expect(testMCQ.find("#question").text()).toBe("Which of these sounds like \"i\" in English?")
})

it('Shows the four choices', () => {
    let q = {type: 1, question: "sounds like \"i\" in English", a: "ა", b: "ო", c: "უ", d: "ი", answer: Choices.D}
    let testMCQ = shallow(<MultipleChoiceQuestion q={q} />)

    expect(testMCQ.find("#choiceValue-a").text()).toBe("ა")
    expect(testMCQ.find("#choiceValue-b").text()).toBe("ო")
    expect(testMCQ.find("#choiceValue-c").text()).toBe("უ")
    expect(testMCQ.find("#choiceValue-d").text()).toBe("ი")
})

it('Can select a choice', () => {
    let q = {type: 1, question: "sounds like \"i\" in English", a: "ა", b: "ო", c: "უ", d: "ი", answer: Choices.D}
    let testMCQ = mount(<MultipleChoiceQuestion q={q} />)

    testMCQ.find("#choicebox-a").simulate("change", {})

    expect(testMCQ.find("#choicebox-a").props().checked).toBe(true)
})

it('Can select only one choice at a time', () => {
    let q = {type: 1, question: "sounds like \"i\" in English", a: "ა", b: "ო", c: "უ", d: "ი", answer: Choices.D}
    let testMCQ = mount(<MultipleChoiceQuestion q={q} />)

    testMCQ.find("#choicebox-a").simulate("change", {})
    testMCQ.find("#choicebox-b").simulate("change", {})

    expect(testMCQ.find("#choicebox-a").props().checked).toBe(false)
    expect(testMCQ.find("#choicebox-b").props().checked).toBe(true)
})

it('Marks a correct answer as correct', () => {
    let q = {type: 1, question: "sounds like \"i\" in English", a: "ა", b: "ო", c: "უ", d: "ი", answer: Choices.D}
    let testMCQ = mount(<MultipleChoiceQuestion q={q} />)

    testMCQ.find("#choicebox-d").simulate("change", {})

    let markButton = testMCQ.find("#submit-for-marking-button")
    markButton.simulate("click")

    expect(testMCQ.find("#question-result-correct").exists()).toBe(true)
})

it('Marks an incorrect answer as incorrect', () => {
    let q = {type: 1, question: "sounds like \"i\" in English", a: "ა", b: "ო", c: "უ", d: "ი", answer: Choices.D}
    let testMCQ = mount(<MultipleChoiceQuestion q={q} />)

    testMCQ.find("#choicebox-c").simulate("change", {})

    let markButton = testMCQ.find("#submit-for-marking-button")
    markButton.simulate("click")

    expect(testMCQ.find("#question-result-incorrect").exists()).toBe(true)
    expect(testMCQ.find("#question-result-correct").exists()).toBe(false)
})